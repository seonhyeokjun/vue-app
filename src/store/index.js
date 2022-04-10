import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router"
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    loginCheck: null
  },
  getters: {},
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {
    async login({ commit }, payload) {
      const { id, pwd } = payload;

      try {
        const res = await axios.get("/auth/client");
        commit("SET_USER_INFO", res.data);
        // router.push(home 으로 이동하기)
      } catch (error) {
        // error handling
      }
    }
  }
})
