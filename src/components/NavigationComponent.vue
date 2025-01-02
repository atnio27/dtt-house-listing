<template>
  <div class="header-content">
    <img src="../assets/icons/img_logo_dtt@3x.png" alt="DTT Logo" class="logo" />
    <nav class="nav">
      <router-link class="nav-link" to="/houses"
        :class="{ active: $route.path.includes('/houses') }">Houses</router-link>
      <!-- <router-link class="nav-link" to="/about" :class="{ active: $route.path === '/about' }">About</router-link> -->
      <!-- I'll add more navigation items later if needed -->
    </nav>
  </div>
</template>

<script setup>
</script>

<style scoped>
.header-content {
  display: flex;
  align-items: center;
  padding: 0 320px;
  min-height: 80px;
  gap: 40px;
  zoom: 0.7;

  .nav {
    display: flex;
    gap: 40px;
    z-index: 9999;
  }

  .logo {
    height: 50px;
  }

  .nav-link {
    font-size: large;
    font-weight: bold;
    color: rgb(181, 181, 181);
    text-decoration: none;
    padding: 10px;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;

    &.active {
      color: black;
    }

    &:hover {
      background-color: rgb(245, 245, 245);
    }
  }
}
</style>
