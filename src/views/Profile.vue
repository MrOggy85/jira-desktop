<template>
  <div class="about">
    <h1>Profile</h1>
     <b-button
      variant="success"
      v-on:click="refresh"
    >Refresh</b-button>

    <b-container fluid="sm">
      <b-row>
        <b-col>Display Name</b-col>
        <b-col>{{displayName}}</b-col>
      </b-row>
      <b-row>
        <b-col>Username</b-col>
        <b-col>{{username}}</b-col>
      </b-row>
      <b-row>
        <b-col>Email</b-col>
        <b-col>{{emailAddress}}</b-col>
      </b-row>
      <b-row>
        <b-col>Time Zone</b-col>
        <b-col>{{timeZone}}</b-col>
      </b-row>

    </b-container>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getUserFromJira } from '../services/user';

const Component = Vue.extend({
  name: 'My Tickets',
  data() {
    return {
      items: [
        { age: 40, firstName: 'Dickerson', lastName: 'Macdonald' },
        { age: 21, firstName: 'Larsen', lastName: 'Shaw' },
        { age: 89, firstName: 'Geneva', lastName: 'Wilson' },
        { age: 38, firstName: 'Jami', lastName: 'Carney' },
      ],
      displayName: '',
      emailAddress: '',
      username: '',
      timeZone: '',
    };
  },
  methods: {
    async refresh() {
      const result = await getUserFromJira();

      console.log('result', result);

      this.displayName = result.displayName;
      this.emailAddress = result.emailAddress;
      this.username = result.name;
      this.timeZone = result.timeZone;
    },
  },
});

export default Component;
</script>
