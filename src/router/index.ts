import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const stableRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(
        /* webpackChunkName: "index" */ '@/pages/stable/login/LoginPage.vue'
      ),
  },
  {
    path: '/notFound',
    name: 'notFound',
    component: () =>
      import(
        /* webpackChunkName: "index" */ '@/pages/stable/notFound/NotFound.vue'
      ),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: stableRoutes,
});

export default router;
