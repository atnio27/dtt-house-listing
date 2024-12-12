<template>
  <div class="home">
    <div class="house-list-header">
      <header>
        <h1>Houses</h1>
        <button>Create New</button>
      </header>
      <footer>
        <input type="text" placeholder="Search for a house">
        <button>Size</button>
      </footer>
    </div>
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

.house-list-header {
  display: flex;
  flex-direction: column;
  gap: 25px;

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      margin: 0;
      font-size: 24px;
    }

    button {
      border: none;
      border-radius: 8px;
      padding: 10px;
      margin: 0px;
      cursor: pointer;
      font-size: 16px;
      background-color: orange;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;

    input {
      border: none;
      background-color: rgb(226, 226, 226);
      /* padding-left: 10px; */
      /* padding-right: 10px; */
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 26px;
      padding-right: 200px;
      border-radius: 4px;

      &:focus {
        outline: none;
      }
    }
  }
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
