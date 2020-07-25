import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

type AppState = {
  user: {
    username: string;
    password: string;
  };
}

export function getStore(component: Vue) {
  return component.$store as Store<AppState>;
}

const SET_USER = 'setUser';
type SET_USER_PAYLOAD = {
  username: string;
  password: string;
}

export const store = new Vuex.Store<AppState>({
  state: {
    user: {
      username: '',
      password: '',
    },
  },
  mutations: {
    [SET_USER]: (state, payload: SET_USER_PAYLOAD) => {
      state.user.username = payload.username;
      state.user.password = payload.password;
    },
  },
  actions: {
  },
  modules: {
  },
});

export function setUser(username: string, password: string) {
  const payload: SET_USER_PAYLOAD = {
    username,
    password,
  };

  store.commit(SET_USER, payload);
}
