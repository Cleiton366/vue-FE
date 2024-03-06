<template>
  <div class="notification-container">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    msg: String
  }
}
</script>