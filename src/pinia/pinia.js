import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    tasks:[]

  }),
  actions: {
    addTask(task) {
  this.tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(this.tasks))
      
    },
    deleteTask(id){

        this.tasks = this.tasks.filter(task => task.id !== id)
    },

    ToggleTask(id){
      this.task = this.tasks.find(task => task.id === id)
      if (this.task) {
        this.task.completed = !this.task.completed
      }
    }

  }
})