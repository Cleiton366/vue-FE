<template>
  <div class="requests-view">
    <RequestsTable />
  </div>
</template>

<script>
import RequestsTable from '@/components/RequestsTable.vue';

export default {
  name: 'RequestsView',
  components: {
    RequestsTable
  }
}
</script>