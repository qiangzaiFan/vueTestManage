import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../views/TableExample.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/FormExample.vue')
  },
  {
    path: '/personal-config',
    name: 'PersonalConfig',
    component: () => import('../views/PersonalConfig.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router