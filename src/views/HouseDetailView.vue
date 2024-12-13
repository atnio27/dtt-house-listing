<template>
  <div class="house-detail">
    <div class="back-navigation">
      <router-link to="/houses" class="back-link">
        <img src="@/assets/icons/ic_back_grey@3x.png" alt="Back" class="icon">
        Back to overview
      </router-link>
    </div>

    <div class="content-wrapper">
      <div class="main-content">
        <img :src="house?.image" :alt="house?.location?.street" class="main-image">

        <div class="house-info">
          <div class="title-section">
            <h1>{{ house?.location?.street }}</h1>
            <div class="action-buttons">
              <button class="edit-button">
                <img src="../assets/icons/ic_edit@3x.png" alt="Edit" class="icon">
              </button>
              <button class="delete-button">
                <img src="../assets/icons/ic_delete@3x.png" alt="Delete" class="icon">
              </button>
            </div>
          </div>

          <p class="address">
            <img src="../assets/icons/ic_location@3x.png" alt="Location" class="icon">
            {{ house?.location?.postcode }} {{ house?.location?.city }}
          </p>

          <div class="details-grid">
            <div class="detail-item">
              <img src="../assets/icons/ic_price@3x.png" alt="Price" class="icon">
              € {{ formatPrice(house?.price) }}
            </div>
            <div class="detail-item">
              <img src="../assets/icons/ic_size@3x.png" alt="Size" class="icon">
              {{ house?.size }} m²
            </div>
            <div class="detail-item">
              <img src="../assets/icons/ic_construction_date@3x.png" alt="Construction Date" class="icon">
              Built in {{ house?.construction_year }}
            </div>
          </div>

          <div class="features-grid">
            <div class="feature-item">
              <img src="../assets/icons/ic_bed@3x.png" alt="Bedrooms" class="icon">
              {{ house?.rooms?.bedrooms }}
            </div>
            <div class="feature-item">
              <img src="../assets/icons/ic_bath@3x.png" alt="Bathrooms" class="icon">
              {{ house?.rooms?.bathrooms }}
            </div>
            <div class="feature-item">
              <img src="../assets/icons/ic_garage@3x.png" alt="Garage" class="icon">
              {{ house?.garage ? 'Yes' : 'No' }}
            </div>
          </div>

          <p class="description">{{ house?.description }}</p>
        </div>
      </div>

      <div class="sidebar">
        <h2>Recommended for you</h2>
        <div class="recommendations">
          <div v-for="recommendation in recommendations" :key="recommendation.id" class="recommendation-card">
            <img :src="recommendation.image" class="recommendation-image">
            <div class="recommendation-info">
              <!-- <h3>{{ recommendation.location.street }}</h3> -->
              <p class="price">€ {{ formatPrice(recommendation.price) }}</p>
              <!-- <p class="location"> {{ recommendation.location.city }}</p> -->
              <div class="features">
                <span><img src="../assets/icons/ic_bed@3x.png" alt="Bedrooms" class="icon">
                  <!-- {{recommendation.rooms.bedrooms }} -->
                </span>
                <span><img src="../assets/icons/ic_bath@3x.png" alt="Bathrooms" class="icon">
                  <!-- {{  recommendation.rooms.bathrooms }} -->
                </span>
                <span><img src="../assets/icons/ic_size@3x.png" alt="Size" class="icon"> {{ recommendation.size
                  }}m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api.js'



const route = useRoute()
const router = useRouter()
const house = ref(null)
const recommendations = ref([])

const formatPrice = (price) => {
  return price?.toLocaleString('nl-NL')
}

onMounted(async () => {
  try {
    const response = await api.getHouseById(route.params.id);
    house.value = response.data[0];
    // In a real app, you I wouldfetch actual recommendations
    recommendations.value = Array(3).fill(response.data)
  } catch (error) {
    console.error('Error fetching house details:', error)
    router.push('/')
  }
})
</script>

<style scoped>
.house-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.back-navigation {
  margin-bottom: 20px;
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
  gap: 40px;
}

.main-content {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.house-info {
  padding: 24px;
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.edit-button,
.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.address {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--secondary-text);
  margin-bottom: 24px;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--background-1);
  border-radius: 8px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.description {
  color: var(--secondary-text);
  line-height: 1.6;
}

.sidebar {
  background: white;
  border-radius: 8px;
  padding: 24px;
}

h2 {
  margin-bottom: 16px;
  font-size: 18px;
}

.recommendations {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
