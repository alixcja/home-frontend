import { createMemoryHistory, createRouter } from 'vue-router'

import BookingPage from '../ui/pages/BookingPage.vue'

const routes = [
  { path: '/booking', component: BookingPage },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})