<template>
  <div class="about">
    <b-container>
      <h1>{{key}}</h1>
      <h2>{{summary}}</h2>
     <b-table striped hover :items="items" />
    </b-container>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import getTicket from '../services/ticket';

const Component = Vue.extend({
  name: 'My Tickets',
  data<Data>() {
    return {
      key: '',
      summary: '',
      items: [] as Item[],
    };
  },
  async created() {
    const { id } = this.$route.params;
    console.log('id', id);

    const result = await getTicket(id);
    // this.key = result.key;
    // this.summary = result.fields.summary;

    this.key = result.key;
    this.summary = result.summary;

    // this.items.push({ type: 'key', value: result.key });
    // this.items.push({ type: 'summary', value: result.summary });
    this.items.push({ type: 'description', value: result.description });
    this.items.push({ type: 'status', value: result.status.name });
    this.items.push({ type: 'reporter', value: result.reporter.displayName });
    this.items.push({ type: 'creator', value: result.creator.displayName });
    this.items.push({ type: 'assignee', value: result.assignee.displayName });
    this.items.push({ type: 'created', value: result.created.toLocaleString() });
    this.items.push({ type: 'updated', value: result.updated.toLocaleString() });
  },
});

export default Component;

type Item = {
  type: string;
  value: string;
}

type Data = {
  items: Item[];
};

// export default {
//   name: 'My Tickets',
//   data<Data>() {
//     return {
//       key: '',
//       summary: '',
//       items: [] as Item[],
//     };
//   },
//   async created() {
//     const { id } = this.$route.params;
//     console.log('id', id);

//     const result = await getTicket(id);
//     // this.key = result.key;
//     // this.summary = result.fields.summary;

//     this.key = result.key;
//     this.summary = result.summary;

//     // this.items.push({ type: 'key', value: result.key });
//     // this.items.push({ type: 'summary', value: result.summary });
//     this.$data.items.push({ type: 'description', value: result.description });
//     this.$data.items.push({ type: 'status', value: result.status.name });
//     this.$data.items.push({ type: 'reporter', value: result.reporter.displayName });
//     this.$data.items.push({ type: 'creator', value: result.creator.displayName });
//     this.$data.items.push({ type: 'assignee', value: result.assignee.displayName });
//     this.$data.items.push({ type: 'created', value: result.created.toLocaleString() });
//     this.$data.items.push({ type: 'updated', value: result.updated.toLocaleString() });
//   },
// };
</script>

<style scoped>
td {
  text-align: left;
}
</style>>
