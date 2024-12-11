<template>
  <nav>
    <router-link to="/" :class="{ active: $route.path === '/' }">Houses</router-link>
    <!-- I'll add more navigation items later if needed -->
  </nav>
</template>

<script setup>
// No setup needed for now
</script>

<style scoped>
nav {
  background-color: #f8f8f8;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

a {
  color: #333;
  text-decoration: none;
  margin-right: 1rem;
}

a.active {
  font-weight: bold;
}
</style>
