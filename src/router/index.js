import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/Login'], resolve)
  },
  {
    path: '/resign',
    name: 'resign',
    component: resolve => require(['@/views/Resign'], resolve)
  },
  {
    path: '/examlist',
    name: 'examlist',
    component: resolve => require(['@/views/ExamList'], resolve)
  },
  {
    path: '/examdetails',
    name: 'examdetails',
    component: resolve => require(['@/views/ExamDetails'], resolve)
  }
]

const router = new VueRouter({
  routes
})

export default router
