import { defineStore } from 'pinia'
import api from '@/services/api'

export const useHouseStore = defineStore('house', {
  state: () => ({
    houses: [],
    currentHouse: null,
    isLoading: false,
    error: null,
    deletionConfirmation: {
      isOpen: false,
      houseId: null,
    },
  }),
  getters: {
    getHouseById: (state) => (id) => {
      return state.houses.find((house) => house.id === id)
    },
    sortedHouses: (state) => (sortBy) => {
      return [...state.houses].sort((a, b) => {
        if (sortBy === 'price') {
          return a.price - b.price
        } else if (sortBy === 'size') {
          return a.size - b.size
        }
        return 0
      })
    },
  },
  actions: {
    async fetchHouses() {
      this.isLoading = true
      try {
        const response = await api.getHouses()
        this.houses = response.data
        this.error = null
      } catch (error) {
        this.error = 'Error fetching houses'
        console.error('Error fetching houses:', error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchHouseById(id) {
      this.isLoading = true
      try {
        const response = await api.getHouseById(id)
        this.currentHouse = response.data[0]
        this.error = null
      } catch (error) {
        this.error = 'Error fetching house details'
        console.error('Error fetching house details:', error)
      } finally {
        this.isLoading = false
      }
    },
    async createHouse(houseData) {
      this.isLoading = true
      try {
        const response = await api.createHouse(houseData)
        this.houses.push(response.data)
        this.error = null
        return response.data
      } catch (error) {
        this.error = 'Error creating house'
        console.error('Error creating house:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async updateHouse(houseData, id) {
      this.isLoading = true
      try {
        const response = await api.updateHouse(houseData, id)
        this.error = null
        return response.data
      } catch (error) {
        this.error = 'Error updating house'
        console.error('Error updating house:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async deleteHouse(id) {
      this.isLoading = true
      try {
        await api.deleteHouse(id)
        this.houses = this.houses.filter((house) => house.id !== id)
        this.error = null
      } catch (error) {
        this.error = 'Error deleting house'
        console.error('Error deleting house:', error)
      } finally {
        this.isLoading = false
      }
    },
    async uploadImage(id, image) {
      this.isLoading = true
      try {
        await api.uploadImage(id, image)
        this.error = null
      } catch (error) {
        this.error = 'Error uploading image'
        console.error('Error uploading image:', error)
      } finally {
        this.isLoading = false
      }
    },
    openDeletionConfirmation(houseId) {
      this.deletionConfirmation.isOpen = true
      this.deletionConfirmation.houseId = houseId
    },

    closeDeletionConfirmation() {
      this.deletionConfirmation.isOpen = false
      this.deletionConfirmation.houseId = null
    },

    async confirmDeleteHouse() {
      if (this.deletionConfirmation.houseId) {
        await this.deleteHouse(this.deletionConfirmation.houseId)
        this.closeDeletionConfirmation()
      }
    },
  },
})
