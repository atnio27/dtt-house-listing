<template>
  <div class="house-list">
    <div v-for="house in houses" :key="house.id">
      <HouseCard :house="house" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import HouseCard from '../components/HouseCard.vue'

const props = defineProps({
  houses: {
    type: Array,
    required: true
  }
})
</script>
