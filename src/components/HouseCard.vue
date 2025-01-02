<template>
  <div class="house-info">
    <img :src="house.image" :alt="house.address" class="house-image" @click="navigateToHouseDetail" />
    <div class="house-details" @click="navigateToHouseDetail">
      <h4>{{ house.location.street }}</h4>
      <p class="price">&euro; {{ formatPrice(house.price) }}</p>
      <p class="address">{{ house.location.zip }} {{ house.location.city }}</p>
      <div class="house-features">
        <span class="feature"><img src="@/assets/icons/ic_bed@3x.png" alt="Bed Icon" class="icon small-icon" />
          {{ house.rooms.bedrooms }}</span>
        <span class="feature"><img src="@/assets/icons/ic_bath@3x.png" alt="Bathrooms Icon" class="icon small-icon" />{{
          house.rooms.bathrooms }}</span>
        <span class="feature"><img src="@/assets/icons/ic_size@3x.png" alt="Bed Icon" class="icon small-icon" />
          {{ house.size }} m2</span>
      </div>
    </div>
    <div class="house-actions" v-if="house.madeByMe === true">
      <button class="edit-button" @click="navigateToHouseEdit">
        <img src="@/assets/icons/ic_edit@3x.png" alt="Edit Icon" class="icon small-icon" />
      </button>
      <button class="delete-button" @click="openDeleteConfirmation">
        <img src="@/assets/icons/ic_delete@3x.png" alt="Delete Icon" class="icon small-icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import router from '@/router'
import { useHouseStore } from '@/stores/houseStore';

const props = defineProps({
  house: {
    type: Object,
    required: true,
  },
})

const houseStore = useHouseStore();

const formatPrice = (price) => {
  return price?.toLocaleString('nl-NL')
}

const navigateToHouseDetail = () => {
  router.push(`/houses/${props.house.id}`)
}

const openDeleteConfirmation = () => {
  houseStore.openDeletionConfirmation(props.house.id);
};

const navigateToHouseEdit = () => {
  router.push(`/houses/${props.house.id}/edit`)
}
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
  max-width: 1000px;
  margin: 16px auto;
  transition: transform 0.2s ease;

  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
}

.house-image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
}

.house-details {
  flex-grow: 1;
  margin-left: 16px;

  .price {
    margin-top: 10px;
    font-size: small;
    color: var(--secondary-text);
  }

  .address {
    font-size: small;
    color: var(--secondary-text);
  }
}

.house-features {
  display: flex;
  gap: 16px;
  margin-top: 10px;
  font-size: small;
  color: var(--secondary-text);
}

.feature {
  display: flex;
  align-items: center;
  gap: 10px;
}

.house-actions {
  display: flex;
  /* flex-direction: column; */
  padding-bottom: 80px;
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
