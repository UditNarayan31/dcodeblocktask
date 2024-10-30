import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MaleProducts from '@/views/MaleProducts.vue'
import CartView from '@/views/CartView.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

import Profile from '@/views/Profile.vue'
import AdminView from '@/views/AdminView.vue'
import Assignment3 from '@/views/Assignment3.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/products',
      name: 'maleproducts',
      component: MaleProducts
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/assign3',
      name: 'Assignment3',
      component: Assignment3
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
 
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/adminview',
      name: 'Admin',
      component: AdminView
    },
  ]
})

export default router
