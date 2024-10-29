<template>
  <div class="todo-container">
    <h1>Todo List</h1>
    <form @submit.prevent="addTask">
      <input v-model="newTask" type="text" placeholder="Enter a new task" required>
      <button type="submit">{{ t('Add Task') }}</button>
    </form>
    <ul>
      <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
        <span @click="toggleComplete(task.id)">{{ task.text }}</span>
        <div>
          <button @click="toggleComplete(task.id)" class="complete-btn">
            {{ task.completed ? 'Undo' : 'Complete' }}
          </button>
          <button @click="deleteTask(task.id)" class="delete-btn">{{ t('Delete') }}</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useCounterStore } from '../pinia/pinia'
const store = useCounterStore()
const { locale, t } = useI18n();
import { ref, onMounted, watch, computed } from 'vue'

const newTask = ref('')
// const tasks = ref([])
const tasks=computed(()=> store.tasks)


onMounted(() => {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
})

watch(tasks, (newTasks) => {
  localStorage.setItem('tasks', JSON.stringify(newTasks))
}, { deep: true })

const addTask = () => {

  store.addTask({
    id: Date.now(),
      text: newTask.value,
        completed: false
  })

  // if (newTask.value.trim()) {
  //   tasks.value.push({
  //     id: Date.now(),
  //     text: newTask.value,
  //     completed: false
  //   })
  //   newTask.value = ''
  // }
}

const deleteTask = (id) => {
  // tasks.value = tasks.value.filter(task => task.id !== id)
  store.deleteTask(id)
}

const toggleComplete = (id) => {
  // const task = tasks.value.find(task => task.id === id)
  // if (task) {
  //   task.completed = !task.completed
  // }
  store.ToggleTask(id)
}
</script>

<style scoped>
.todo-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
}

form {
  display: flex;
  margin-bottom: 20px;
}

input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
}

li.completed span {
  text-decoration: line-through;
  color: #888;
}

.complete-btn,
.delete-btn {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}

.complete-btn {
  background-color: #2196F3;
}

.complete-btn:hover {
  background-color: #1976D2;
}

.delete-btn {
  background-color: #f44336;
}

.delete-btn:hover {
  background-color: #d32f2f;
}
</style>