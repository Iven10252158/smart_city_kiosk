import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'content',
        name: 'content',
        component: () => import('@/views/Content.vue')
      },
      {
        path: 'merchantDetail',
        name: 'merchantDetail',
        component: () => import('@/views/MerchantDetail.vue')
      },
      {
        path: 'omo',
        name: 'omo',
        component: () => import('@/views/Omo.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
