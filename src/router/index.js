import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from "../views/Create";
import Board from "../views/Board";
import Detail from "../views/Detail";
import ChatRoom from "../views/chat/ChatRoom"

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
    path: '/detail/:data',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/chatroom',
    name: 'ChatRoom',
    component: ChatRoom
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
