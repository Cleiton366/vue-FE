<template>
  <div class="home-view">
    <Banner />
    <Form />
  </div>
</template>

<script>

import Banner from '@/components/Banner.vue'
import Form from '@/components/Form.vue'

export default {
    name: 'HomeView',
    components: {
      Banner,
      Form
    }
}

</script>
