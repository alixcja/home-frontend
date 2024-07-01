import { createMemoryHistory, createRouter } from 'vue-router'

import BookingPage from '../ui/pages/BookingPage.vue'
import DashboardPage from '../ui/pages/DashboardPage.vue'

const routes = [
  { path: '/booking', component: BookingPage },
  { path: '/dashboard', component: DashboardPage },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})