<template>
  <header class="header">
    <Navigation />
  </header>
  <main class="main">
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

  .header {
    background-color: rgb(255, 255, 255, 0.7);
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    backdrop-filter: blur(6px);
    border-bottom: 1px solid rgb(212, 217, 219);
    z-index: 999;
  }

  .main {
    margin-top: 60px;
  }
}
</style>
