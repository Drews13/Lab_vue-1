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
    component: () => import('@/views/products/ProductsPage.vue'),
    children: [
      {
        path: ':categoryName',
        component: () => import('@/views/products/ProductsPage.vue'),
        name: 'categoryPage',
      }
    ]
  },
  {
    path: '/about',
    name: 'aboutPage',
    component: () => import('@/views/AboutPage.vue'), 
  },
  {
    path: '/categories',
    name: 'categoriesPage',
    component: () => import('@/views/categories/CategoriesPage.vue'),
  },
  {
    path: '/product/:id',
    name: 'productPage',
    component: () => import('@/views/products/ProductPage.vue'),
  },
  {
    path: '/profile',
    name: 'userPage',
    component: () => import('@/views/user/UserPage.vue'),
  },
  {
    path: '/cart',
    name: 'cartPage',
    component: () => import('@/views/order/CartPage.vue'),
  },
  {
    path: '/checkout',
    name: 'checkoutPage',
    component: () => import('@/views/order/CheckoutPage.vue'),
  },
  {
    path: '/order/thanks/:id',
    name: 'orderThanksPage',
    component: () => import('@/views/order/OrderThanksPage.vue'),
  },
  {
    path: '/admin',
    name: 'adminPage',
    component: () => import('@/views/admin/AdminPage.vue'),
  },
  {
    path: '/admin/products',
    name: 'adminProductsPage',
    component: () => import('@/views/admin/AdminProductsPage.vue'),
  },
  {
    path: '/admin/products/create',
    name: 'adminCreateProductPage',
    component: () => import('@/views/admin/AdminCreateProductPage.vue'),
  },
  {
    path: '/admin/products/edit/:id',
    name: 'adminEditProductPage',
    component: () => import('@/views/admin/AdminEditProductPage.vue'),
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
  linkActiveClass: 'header-component__nav-link--active'
});

export default router;
