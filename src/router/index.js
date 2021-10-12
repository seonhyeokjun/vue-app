import Vue from 'vue'
import VueRouter from 'vue-router'
import Posting from "../views/Posting";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Posting',
    component: Posting
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
