import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from "../views/Create";
import Board from "../views/Board";
import Detail from "../views/Detail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Board',
    component: Board
  },
  {
    path: '/create/:data?',
    name: 'Create',
    component: Create
  },
  {
    path: '/create/:data',
    name: 'Detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
