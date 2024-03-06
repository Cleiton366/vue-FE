<template>
  <div class="navbar">
    <router-link to="/" class="logo">
      <img alt="Store logo" src="../assets/images/logo.png">
    </router-link>
    <router-link to="/">Home</router-link>
    <router-link to="/requests">Requests</router-link>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>