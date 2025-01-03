import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.intern.d-tt.nl/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': 'wYhXlJIK-gDvHGP3frbaWzsF7T6MeAN_',
  },
})

export default {
  getHouses() {
    return apiClient.get('/houses')
  },
  getHouseById(id) {
    return apiClient.get(`/houses/${id}`)
  },
  createHouse(data) {
    return apiClient.post('/houses', data)
  },
  updateHouse(data, id) {
    return apiClient.post(`/houses/${id}`, data)
  },
  uploadImage(id, image) {
    return apiClient.post(`/houses/${id}/upload`, image, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  deleteHouse(id) {
    return apiClient.delete(`/houses/${id}`)
  },
}
