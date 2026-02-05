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
  },
  {
    path: '/select-demo',
    name: 'SelectInputDemo',
    component: () => import('../views/SelectInputDemo.vue')
  },
  {
    path: '/team-dashboard',
    name: 'TeamDashboard',
    component: () => import('../views/TeamDashboard.vue')
  },
  {
    path: '/personal-portrait',
    name: 'PersonalPortrait',
    component: () => import('../views/PersonalPortrait.vue')
  },
  {
    path: '/team-report',
    name: 'TeamReport',
    component: () => import('../views/TeamReport.vue')
  },
  {
    path: '/business-category',
    name: 'BusinessCategoryDemo',
    component: () => import('../views/BusinessCategoryDemo.vue')
  },
  {
    path: '/business-capability',
    name: 'BusinessCapabilityManage',
    component: () => import('../views/BusinessCapabilityManage.vue')
  },
  {
    path: '/tree-usage',
    name: 'TreeUsageDemo',
    component: () => import('../views/TreeUsageDemo.vue')
  },
  {
    path: '/score-form',
    name: 'ScoreForm',
    component: () => import('../views/ScoreForm.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
