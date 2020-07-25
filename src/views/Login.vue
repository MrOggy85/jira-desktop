<template>
    <b-container>
      <h1 class="title">Login</h1>

      <b-container class="form">
        <b-form-group
          label-cols-sm="4"
          label-cols-lg="3"
          label="Username"
          label-for="input-horizontal"
        >
          <b-form-input
            v-model="username"
            placeholder="Username"
            type="text"
            autocomplete="off"
            spellcheck="false"
            :disabled="loading"
            v-on:input="inputChange"
          />
        </b-form-group>

        <b-form-group
          label-cols-sm="4"
          label-cols-lg="3"
          label="Password"
          label-for="input-horizontal"
        >
          <b-form-input
            v-model="password"
            placeholder="Password"
            type="password"
            autocomplete="off"
            spellcheck="false"
            :disabled="loading"
            v-on:input="inputChange"
          />
        </b-form-group>

        <b-form-group
          label-cols-sm="4"
          label-cols-lg="3"
          label="Remember Me"
          label-for="input-horizontal"
        >
          <b-form-checkbox
            class="checkbox"
            v-model="rememberLogin"
            :disabled="loading"
          >
          </b-form-checkbox>
        </b-form-group>

        <b-alert
          :show="loginFailed"
          variant="danger"
        >Login Failed</b-alert>

        <b-button
          variant="success"
          v-on:click="login"
          :disabled="loading || isValid"
        >
          <b-spinner
            label="Spinning"
            v-if="loading"
          />
          <div v-else>Login</div>
        </b-button>

      </b-container>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { setUser } from '@/store';
import { login } from '../services/user';
import { saveUserData } from '../services/persist';

type Data = {
  loading: boolean;
  username: string;
  password: string;
  rememberLogin: boolean;
  loginFailed: boolean;
}

const Component = Vue.extend<Data, {}, {}, {}>({
  name: 'Login',
  data() {
    return {
      loading: false,
      username: '',
      password: '',
      rememberLogin: false,
      loginFailed: false,
    };
  },
  computed: {
    isValid() {
      return !this.username || !this.password;
    },
  },
  methods: {
    inputChange() {
      if (this.loginFailed) {
        this.loginFailed = false;
      }
    },
    async login() {
      this.loading = true;
      this.loginFailed = false;
      let result;
      try {
        result = await login(this.username, this.password);
      } catch (error) {
        console.error(error);
        this.loading = false;
        this.loginFailed = true;
        return;
      }

      console.log('result', result);

      if (!result) {
        this.loading = false;
        this.loginFailed = true;
        return;
      }

      setUser(this.username, this.password);

      if (this.rememberLogin) {
        try {
          await saveUserData({
            username: this.username,
            password: this.password,
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          await saveUserData({
            username: '',
            password: '',
          });
        } catch (error) {
          console.error(error);
        }
      }

      this.loading = false;
    },
  },
});

export default Component;
</script>

<style scoped>
.title {
  margin-bottom: 75px;
}
.form {
  width: 75%;
}
.checkbox {
  width: 0;
}
</style>
