import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HouseDetailView from '@/views/HouseDetailView.vue'
import CreateHouseView from '@/views/CreateHouseView.vue'
import EditHouseView from '@/views/EditHouseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/houses',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/houses/create',
      name: 'create-house',
      component: CreateHouseView,
    },
    {
      path: '/houses/:id',
      name: 'house-detail',
      component: HouseDetailView,
    },
    {
      path: '/houses/:id/edit',
      name: 'edit-house',
      component: EditHouseView,
    },
    {
      path: '/',
      redirect: '/houses',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/houses',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
