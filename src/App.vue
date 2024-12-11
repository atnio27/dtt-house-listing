<template>
  <div id="app">
    <header>
      <Navigation />
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
