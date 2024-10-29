import { createRouter, createWebHistory } from 'vue-router'
import alltodo from '@/components/alltodo.vue'
import completedtodo from '@/components/completedtodo.vue'
import chart from '@/components/chart.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path: '/',
      name: 'alltodo',
      
      component: alltodo
    },
    {
      path: '/completedtodo',
      name: 'completedtodo',
      component:completedtodo
      
    },
    {
      path: '/chart',
      name: 'chart',
      component:chart
      
    },
  ]
})

export default router
