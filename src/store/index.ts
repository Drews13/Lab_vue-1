import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { IState } from '@/interfaces/IState';

const store = createStore<IState>({
  plugins: [createPersistedState({})],

  state: {
    isAuth: false,
    userData: {
      email: '',
      password: '',
    },
    warnings: [],
    errors: [],
  },

  mutations: {
    userLogin(state) {
      state.isAuth = true;
    },

    userLogout(state) {
      state.isAuth = false;
    },

    storeUserData(state, data) {
      state.userData = data;
    },

    clearUserData(state) {
      state.userData.email = '';
      state.userData.password = '';
    },

    storeWarning(state, data) {
      if (state.warnings.length < 5) {
        state.warnings.push(data);
      } else {
        state.warnings.shift();
        state.warnings.push(data);
      }
    },

    storeError(state, data) {
      if (state.errors.length < 5) {
        state.errors.push(data);
      } else {
        state.errors.shift();
        state.errors.push(data);
      }
    }
  }
});

export default store;
