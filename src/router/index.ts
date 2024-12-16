import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/dashboard", meta: { hideHeader: false } },
  {
    path: "/booking",
    component: () => import("@/ui/pages/BookingPage.vue"),
    meta: { hideHeader: false },
  },
  {
    path: "/dashboard",
    component: () => import("@/ui/pages/DashboardPage.vue"),
    meta: { hideHeader: false },
  },
  {
    path: "/login",
    component: () => import("@/ui/pages/LoginPage.vue"),
    meta: { hideHeader: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
