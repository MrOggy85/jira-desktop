<template>
  <div class="about">
    <h1>My Tickets</h1>
    <b-button
      variant="success"
      v-on:click="refresh"
      :disabled="loading"
    >
      Refresh
    </b-button>
    <b-spinner
      variant="success"
      label="Spinning"
      v-if="loading"
    />

    <b-container>
      <b-table striped hover :fields="fields" :items="items">
        <template v-slot:cell(url)="data">
          <router-link :to="data.item.link">{{data.item.link}}</router-link>
        </template>
      </b-table>
    </b-container>

  </div>
</template>

<script>
import search from '../services/search';
import getTicket from '../services/ticket';

export default {
  name: 'My-Tickets',
  data() {
    return {
      fields: [
        // A column that needs custom formatting
        { key: 'firstName', label: 'Full Name' },
        // A regular column
        'age',
        { key: 'url', label: 'Banana' },
      ],
      items: [
        { age: 40, firstName: 'Dickerson', link: 'hello' },
        { age: 21, firstName: 'Larsen', lastName: 'Shaw' },
        { age: 89, firstName: 'Geneva', lastName: 'Wilson' },
        { age: 38, firstName: 'Jami', lastName: 'Carney' },
      ],
      loading: false,
    };
  },
  methods: {
    async refresh() {
      this.loading = true;
      const result = await search();

      const m = await Promise.all(result.issues.map(async (x) => {
        const hej = await getTicket(x.key);
        return {
          key: hej.key,
          summary: hej.summary,
          link: `/ticket/${hej.key}`,
        };
      }));

      console.log('m', m);

      this.items = m;

      this.loading = false;

      // this.items = result.issues.map((x) => ({
      //   id: x.id,
      //   projectKey: x.key,
      //   expand: x.expand,
      // }));
    },
  },
};
</script>
