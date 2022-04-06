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
    async login({ commit }) {
      try {
        const res = await axios.get("/auth/client");
        commit("SET_USER_INFO", res.data);
      } catch (error) {
        // error handling
      }
    }
  }
})
