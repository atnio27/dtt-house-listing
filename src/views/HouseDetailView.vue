<template>
  <div class="house-detail">
    <div class="back-navigation">
      <router-link to="/houses" class="back-link">
        <img src="@/assets/icons/ic_back_grey@3x.png" alt="Back" class="icon">

      </router-link>
      <span>Back to overview</span>
    </div>

    <div class="content-wrapper">
      <div class="main-content">
        <img :src="house?.image" :alt="house?.location?.street" class="main-image">

        <div class="info">
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

          <div class="info-details">
            <p class="address">
              <img src="../assets/icons/ic_location@3x.png" alt="Location" class="icon">
              <span>{{ house?.location?.postcode }} {{ house?.location?.city }}</span>
            </p>

            <div class="details-grid">
              <div class="detail-item">
                <img src="../assets/icons/ic_price@3x.png" alt="Price" class="icon">
                <span>{{ formatPrice(house?.price) }}</span>
              </div>
              <div class="detail-item">
                <img src="../assets/icons/ic_size@3x.png" alt="Size" class="icon">
                <span>{{ house?.size }} m2</span>
              </div>
              <div class="detail-item">
                <img src="../assets/icons/ic_construction_date@3x.png" alt="Construction Date"
                  class="icon construction">
                <span>Built in {{ house?.constructionYear }}</span>
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
      </div>

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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api.js'
import HouseList from '@/components/HouseList.vue';



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
    recommendations.value = Array(3).fill(response.data[0])
  } catch (error) {
    console.error('Error fetching house details:', error)
    router.push('/')
  }
})
</script>

<style scoped>
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

.main-content {
  background: white;
  /* border-radius: 8px; */
  overflow: hidden;
  /* display: flex; */
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.info-details {
  /* padding-left: 5px; */
  /* padding-top: 6px; */
  padding: 5px;
  font-size: small;
  display: flex;
  flex-direction: column;
  gap: 14px;


  img {
    width: 12px;
    height: 15px;
  }

}

.info {
  padding: 20px;
  display: flex;
  flex-direction: column;

  .title-section {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 24px;
      text-wrap: nowrap;
    }
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
    /* padding: 8px; */
  }

  .address {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--secondary-text);
    /* margin-bottom: 24px; */
    /* zoom: 0.7; */

  }
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 90px);
  /* gap: 16px; */
}

.detail-item {
  display: flex;
  gap: 8px;

  img {
    width: 14px;
    height: 14px;
  }

  img.construction {
    width: 14px;
    height: 12px;
  }

  span {
    font-size: smaller;
    color: var(--secondary-text);
    text-wrap: nowrap;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 50px);
  /* gap: 16px; */
  /* margin-bottom: 24px; */
  /* padding: 16px; */
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 14px;
    height: 12px;
  }
}

.description {
  color: var(--secondary-text);
  line-height: 1.6;
}

.recommendations {
  display: flex;
  flex-direction: column;
  gap: 16px;
  zoom: .72;
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
