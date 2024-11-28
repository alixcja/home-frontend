import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/booking" },
  { path: "/booking", component: () => import("@/ui/pages/BookingPage.vue") },
  {
    path: "/dashboard",
    component: () => import("@/ui/pages/DashboardPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
