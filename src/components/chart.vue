<template>
    <div class="container">
      <div class="content">
        <h1>{{ t('COMPLETED TASKS') }}</h1>
        <div class="chart-container">
          <canvas ref="chartCanvas"></canvas>
        </div>
        <div class="card">
          <div class="card-header">
            TACHES✅️
          </div>
          <ul class="list-group list-group-flush">
            <li v-for="task in storedData" :key="task.id" class="list-group-item">
              <div v-if="task.completed">{{ task.text }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs'
  
  Chart.register(ArcElement, Tooltip, Legend)
  
  const { t } = useI18n()
  const storedData = ref([])
  const chartCanvas = ref(null)
  
  const chartData = computed(() => {
    const completed = storedData.value.filter(task => task.completed).length
    const uncompleted = storedData.value.length - completed
    return {
      labels: ['Completed', 'Uncompleted'],
      datasets: [{
        data: [completed, uncompleted],
        backgroundColor: ['#4CAF50', '#FFA000'],
        hoverBackgroundColor: ['#45a049', '#FF8F00']
      }]
    }
  })
  
  onMounted(() => {
    const data = localStorage.getItem('tasks')
    if (data) {
      storedData.value = JSON.parse(data)
    }
  
    // Create the chart
    new Chart(chartCanvas.value, {
      type: 'pie',
      data: chartData.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || ''
                const value = context.parsed || 0
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = ((value / total) * 100).toFixed(1)
                return `${label}: ${value} (${percentage}%)`
              }
            }
          }
        }
      }
    })
  })
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f0f0;
  }
  
  .content {
    text-align: center;
    width: 100%;
    max-width: 600px;
  }
  
  .chart-container {
    width: 100%;
    height: 300px;
    margin-bottom: 2rem;
  }
  
  .card {
    width: 100%;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .card-header {
    background-color: #f8f9fa;
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    font-weight: bold;
  }
  
  .list-group {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .list-group-item {
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
  
  .list-group-item:last-child {
    border-bottom: none;
  }
  
  h1 {
    margin-bottom: 1rem;
    color: #333;
  }
  </style>