<template>
  <div class="home">
    <h1>House Listings</h1>
    <HouseList />
  </div>
</template>

<script setup>
import HouseList from '../components/HouseList.vue'
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>

