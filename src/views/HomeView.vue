<template>
  <div class="home">
    <div class="house-list-header">
      <header>
        <h1>Houses</h1>
        <div class="create-container">
          <router-link to="/houses/create" class="create-button">CREATE NEW
            <img src="../assets/icons/ic_plus_white@3x.png" alt="Create new house" class="create-icon small-icon" />
          </router-link>
        </div>
      </header>
      <footer>
        <div class="search-container">
          <img src="../assets/icons/ic_search@3x.png" alt="Clear search" class="icon small-icon" />
          <input type="text" v-model="searchQuery" placeholder="Search for a house" @input="handleSearch" />
          <a v-if="searchQuery" @click="clearSearch" class="clear-search">
            <img src="../assets/icons/ic_clear@3x.png" alt="Clear search" class="icon small-icon" />
          </a>
        </div>
        <div class="sort-toggle">
          <button @click="setSort('price')" :class="{ active: currentSort === 'price' }" class="sort-button left">
            Price
          </button>
          <button @click="setSort('size')" :class="{ active: currentSort === 'size' }" class="sort-button right">
            Size
          </button>
        </div>
      </footer>
      <p v-if="filteredHouses.length > 0 && searchQuery" class="results-count">
        {{ filteredAndSortedHouses.length }} result{{
          filteredAndSortedHouses.length !== 1 ? 's' : ''
        }}
        found
      </p>
      <p v-else-if="searchQuery" class="no-results">No results found for "{{ searchQuery }}"</p>
    </div>
    <HouseList :houses="filteredAndSortedHouses" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useHouseStore } from '@/stores/houseStore'
import HouseList from '../components/HouseList.vue'

const houseStore = useHouseStore()
const searchQuery = ref('')
const currentSort = ref('price')

const setSort = (sort) => {
  currentSort.value = sort
}

const filteredHouses = computed(() => {
  if (!searchQuery.value) return houseStore.houses
  const lowercaseQuery = searchQuery.value.toLowerCase()
  return houseStore.houses.filter(
    (house) =>
      house.location.street.toLowerCase().includes(lowercaseQuery) ||
      house.location.city.toLowerCase().includes(lowercaseQuery) ||
      house.price.toString().includes(lowercaseQuery),
  )
})

const filteredAndSortedHouses = computed(() => {
  return houseStore.sortedHouses(currentSort.value).filter(house =>
    filteredHouses.value.includes(house)
  )
})

const clearSearch = () => {
  searchQuery.value = ''
}

onMounted(() => {
  houseStore.fetchHouses()
})
</script>

<style scoped>
.home {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 40px;
}

.house-list-header {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.create-container {
  position: relative;

  img {
    /* background-color: red; */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &:first-child {
      left: 9px;
    }
  }

  .create-button {
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    padding-left: 35px;
    cursor: pointer;
    font-size: 14px;
    background-color: var(--primary);
    color: white;
    /* text-wrap: nowrap; */
  }
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-container {
  position: relative;
  flex-grow: 1;
  margin-right: 20rem;

  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &:first-child {
      left: 13px;
    }
  }

  input {
    width: 100%;
    border: none;
    background-color: var(--tertiary-1);
    padding: 10px 40px;
    border-radius: 8px;
    font-size: 14px;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--primary);
    }
  }

  a {
    img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      &:first-child {
        left: -20px;
      }
    }
  }
}

.clear-search {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.sort-toggle {
  display: flex;
  border-radius: 8px;
  overflow: hidden;

  .sort-button {
    padding: 10px 50px;
    border: none;
    font-size: 14px;
    font-weight: lighter;
    cursor: pointer;
    background-color: var(--tertiary-1);
    color: var(--secondary-text);
    transition: all 0.2s ease;
  }
}

.sort-button.active {
  background-color: var(--primary);
  color: white;
}

.sort-button.left {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.sort-button.right {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.results-count,
.no-results {
  /* margin-left: 15px; */
  /* margin-top: 10px; */
  font-size: medium;
  font-weight: bold;
}

.small-icon {
  width: 16px;
  height: 16px;
}

.create-icon {
  width: 16px;
  height: 16px;
  object-fit: fit;
  margin-top: 2px;
}
</style>
