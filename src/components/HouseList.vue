<template>
  <div class="house-list">
    <div v-for="house in houses" :key="house.id">
      <HouseCard :house="house" @delete-house="$emit('delete-house', $event)" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import HouseCard from '../components/HouseCard.vue'

defineProps({
  houses: {
    type: Array,
    required: true,
  },
})

defineEmits(['delete-house'])
</script>
