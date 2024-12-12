<template>
  <div class="house-list">
    <div v-for="house in houses" :key="house.id" class="house-info">
      <img :src="house.image" :alt="house.address" class="house-image" />
      <div class="house-details">
        <h2>{{ house.location.street }}</h2>
        <p class="price">&euro; {{ house.price }}</p>
        <p class="address">({{ house.location.houseNumber }} {{ house.location.city }})</p>
        <div class="house-features">
          <span class="feature"><img src="../assets/icons/ic_bed@3x.png" alt="Bed Icon" class="icon small-icon" />
            1</span>
          <span class="feature"><img src="../assets/icons/ic_bath@3x.png" alt="Bed Icon"
              class="icon small-icon" />1</span>
          <span class="feature"><img src="../assets/icons/ic_size@3x.png" alt="Bed Icon" class="icon small-icon" />
            120m<sup>2</sup></span>
        </div>
      </div>
      <div class="house-actions">
        <button class="edit-button"><img src="../assets/icons/ic_edit@3x.png" alt="Edit Icon"
            class="icon small-icon" /></button>
        <button class="delete-button"><img src="../assets/icons/ic_delete@3x.png" alt="Delete Icon"
            class="icon small-icon" /></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const houses = ref([])

onMounted(async () => {
  try {
    const response = await api.getHouses()
    console.log(houses);
    houses.value = response.data
  } catch (error) {
    console.error('Error fetching houses:', error)
  }
})
</script>

<style>
.house-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: auto;
  /* max-width: 900px; */
  margin: 16px auto;
}

.house-image {
  width: 120px;
  height: 120px;
  border-radius: 4px;
  object-fit: cover;
}

.house-details {
  flex-grow: 1;
  margin-left: 16px;
}

.house-features {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 4px;
}

.house-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.edit-button,
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
}

.small-icon {
  width: 16px;
  height: 16px;
}
</style>
