import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: Home
  },
  {
    path: '/products',
    name: 'productsPage',
    component: () => import('@/views/ProductsPage.vue'), 
  },
  {
    path: '/about',
    name: 'aboutPage',
    component: () => import('@/views/AboutPage.vue'), 
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFoundPage.vue'), 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'header-component__router-link--active'
});

export default router;
