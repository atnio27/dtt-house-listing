import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HouseDetailView from '@/views/HouseDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/houses',
      name: 'home',
      component: HomeView
    },
    {
      path: '/houses/:id',
      name: 'house-detail',
      component: HouseDetailView
    },
    {
      path: "/**",
      redirect: "/houses"
    },
    {
      path: '',
      redirect: '/houses'
    }
  ]
})

export default router

