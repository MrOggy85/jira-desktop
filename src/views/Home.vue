<template>
  <div class="home">
    <h1>Jira Home</h1>

    <p>User: {{username}}</p>
    <b-button variant="success">Button</b-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// @ is an alias to /src
// import { ExtendedVue } from 'vue/types/vue';
import HelloWorld from '@/components/HelloWorld.vue';
import { getStore } from '@/store';
// import { CombinedVueInstance } from 'vue/types/vue';
// import { CombinedVueInstance } from 'vue/types/vue';

// interface Vue {
//   banana: string;
// }

// function getStore(this: Vue) {
//   return this.$store as Store<>;
// }

const Component = Vue.extend({
  name: 'Home',
  components: {
    HelloWorld,
  },
  computed: {
    username() {
      const store = getStore(this);
      console.log('username', store.state.user.username);
      return store.state.user.username;
    },
  },
});

export default Component;
</script>
