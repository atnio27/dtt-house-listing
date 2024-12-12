<template>
  <header>
    <Navigation />
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>

<style>
#app {
  display: flex;
  font-family: Arial, sans-serif;
  color: black;
  margin-top: 60px;

  main {
    padding-top: 88px;
  }
}
</style>
