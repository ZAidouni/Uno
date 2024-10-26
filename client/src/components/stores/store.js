// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    time: Number(localStorage.getItem('time')) || 60,
    timer: null,
  },
  mutations: {
    decrementTime(state) {
      if (state.time > 0) {
        state.time--;
        localStorage.setItem('time', state.time);
      } else {
        this.commit('stopTimer');
      }
    },
    startTimer(state) {
      if (!state.timer) {
        state.timer = setInterval(() => {
          this.commit('decrementTime');
        }, 1000);
      }
    },
    stopTimer(state) {
      clearInterval(state.timer);
      state.timer = null;
    },
    resetTime(state) {
      state.time = 60;
      state.timer = setInterval(() => {
        this.commit('decrementTime');
      }, 1000);
      localStorage.setItem('time', state.time);
    },
  },
  actions: {
    startTimer({ commit }) {
      commit('startTimer');
    },
    stopTimer({ commit }) {
      commit('stopTimer');
    },
    resetTime({ commit }) {
      commit('resetTime');
    },
  },
});