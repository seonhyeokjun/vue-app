import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from "../views/Create";
import Board from "../views/Board";
import Detail from "../views/Detail";
import ChatRoom from "../views/chat/ChatRoom";
import Chat from "../views/chat/Chat";
import Login from "../views/Login";
import SignUp from "../views/SignUp";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
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
  },
  {
    path: '/chat/:data',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/board',
    name: 'Board',
    component: Board
  },
  {
    path: "/signup",
    name: 'SignUp',
    component: SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((from, to, next) => {
  console.log("form", from);
  console.log("to", to);
  console.log("next", next);
  next();
});

export default router
