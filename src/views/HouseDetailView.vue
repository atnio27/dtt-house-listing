<template>
  <div class="house-detail">
    <BackNavigation />

    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="content-wrapper">
      <HouseCardDetailed :house="currentHouse" />

      <div class="sidebar">
        <h5>Recommended for you</h5>
        <div class="recommendations">
          <HouseList :houses="recommendations" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHouseStore } from '@/stores/houseStore'
import HouseList from '@/components/HouseList.vue'
import HouseCardDetailed from '@/components/HouseCardDetailed.vue'
import BackNavigation from '@/components/BackNavigation.vue'

const route = useRoute()
const houseStore = useHouseStore()

const currentHouse = computed(() => houseStore.currentHouse)
const isLoading = computed(() => houseStore.isLoading)
const error = computed(() => houseStore.error)

const recommendations = computed(() => {
  const filteredHouses = houseStore.houses.filter(h => h.id !== currentHouse.value?.id)
  const start = Math.floor((Math.random() % 0.7) * filteredHouses.length)
  return filteredHouses.slice(start, start + 3)
})

const loadHouseData = async (id) => {
  await houseStore.fetchHouseById(id)
  if (!houseStore.houses.length) {
    await houseStore.fetchHouses()
  }
}

onMounted(() => {
  loadHouseData(route.params.id)
})

watch(() => route.params.id, (newId) => {
  loadHouseData(newId)
})
</script>

<style>
.house-detail {
  max-width: 1200px;
  margin: 0 140px;
  padding: 20px;
}

.back-navigation {
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  gap: 8px;

  span {
    font-size: small;
    font-weight: 600;
    color: var(--primary-text);
  }
}

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--secondary-text);
  text-decoration: none;
  font-weight: 600;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 65px;
}

.recommendations {
  display: flex;
  flex-direction: column;
  gap: 16px;
  zoom: 0.72;
}

.recommendation-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: var(--background-1);
  border-radius: 8px;
  cursor: pointer;
}

.recommendation-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
}

.recommendation-info {
  flex: 1;
}

.recommendation-info h3 {
  font-size: 14px;
  margin-bottom: 4px;
}

.recommendation-info .price {
  color: var(--primary);
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
}

.recommendation-info .location {
  color: var(--secondary-text);
  font-size: 12px;
  margin-bottom: 8px;
}

.recommendation-info .features {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: var(--secondary-text);
}

.icon {
  width: 16px;
  height: 16px;
  /* obecjt fit cover */
  object-fit: contain;
}

.loading,
.error {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}

.error {
  color: var(--primary);
}

@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .main-image {
    height: 300px;
  }

  .details-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
