<template>
    <div class="container">
        <div class="content">
            <h1>{{t('COMPLETED TASKS')}}</h1>
            <div class="card">
                <div class="card-header">
                    TACHES✅️
                </div>
                <ul class="list-group list-group-flush">
              
                    <li v-for="task in storedData" class="list-group-item">
                        <div v-if="task.completed==true">{{task.text  }}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();
const storedData = ref(null)

onMounted(() => {
  const data = localStorage.getItem('tasks')
  
  if (data) {
    storedData.value = JSON.parse(data)
  }
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
}

.card {
    width: 18rem;
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