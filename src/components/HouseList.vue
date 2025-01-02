<template>
  <div class="house-list">
    <div v-for="house in houses" :key="house.id">
      <HouseCard :house="house" />
    </div>
    <Modal :isOpen="houseStore.deletionConfirmation.isOpen" @close="houseStore.closeDeletionConfirmation">
      <h1>Delete listing</h1>
      <div>
        <p>Are you sure you want to delete this listing?</p>
        <p>This action cannot be undone.</p>
      </div>
      <div class="modal-actions">
        <button @click="confirmDelete" class="delete-button">YES, DELETE</button>
        <button @click="houseStore.closeDeletionConfirmation" class="cancel-button">GO BACK</button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import HouseCard from './HouseCard.vue'
import Modal from './Modal.vue'
import { useHouseStore } from '@/stores/houseStore'
import router from '@/router'

defineProps({
  houses: {
    type: Array,
    required: true,
  },
})

const houseStore = useHouseStore()

const confirmDelete = async () => {
  router.push('/houses')
  await houseStore.confirmDeleteHouse()

}
</script>

<style scoped>
.modal-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  gap: 25px;
}

.cancel-button,
.delete-button {
  padding: 12px 140px;
  border-radius: 8px;
  font-weight: lighter;
  cursor: pointer;
  font-size: medium;
}

.cancel-button {
  background-color: var(--secondary-text);
  color: var(--tertiary-1);
  border: none;
}

.delete-button {
  background-color: var(--primary);
  color: white;
  border: none;
}

p {
  text-align: center;
  margin: 0;
  font-size: 1.2rem;
  color: var(--secondary-text);
}
</style>
