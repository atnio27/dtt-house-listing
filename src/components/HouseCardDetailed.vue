<template>
  <div class="main-content">
    <img :src="house?.image" :alt="house?.location?.street" class="main-image" />

    <div class="info">
      <div class="title-section">
        <h1>{{ house?.location?.street }}</h1>
        <div class="action-buttons">
          <button class="edit-button">
            <img src="../assets/icons/ic_edit@3x.png" alt="Edit" class="icon" />
          </button>
          <button class="delete-button">
            <img src="../assets/icons/ic_delete@3x.png" alt="Delete" class="icon" />
          </button>
        </div>
      </div>

      <div class="info-details">
        <p class="address">
          <img src="../assets/icons/ic_location@3x.png" alt="Location" class="icon" />
          <span>{{ house?.location?.postcode }} {{ house?.location?.city }}</span>
        </p>

        <div class="details-grid">
          <div class="detail-item">
            <img src="../assets/icons/ic_price@3x.png" alt="Price" class="icon" />
            <span>{{ formatPrice(house?.price) }}</span>
          </div>
          <div class="detail-item">
            <img src="../assets/icons/ic_size@3x.png" alt="Size" class="icon" />
            <span>{{ house?.size }} m2</span>
          </div>
          <div class="detail-item">
            <img
              src="../assets/icons/ic_construction_date@3x.png"
              alt="Construction Date"
              class="icon"
            />
            <span>Built in {{ house?.constructionYear }}</span>
          </div>
        </div>

        <div class="features-grid">
          <div class="feature-item">
            <img src="../assets/icons/ic_bed@3x.png" alt="Bedrooms" class="icon" />
            {{ house?.rooms?.bedrooms }}
          </div>
          <div class="feature-item">
            <img src="../assets/icons/ic_bath@3x.png" alt="Bathrooms" class="icon" />
            {{ house?.rooms?.bathrooms }}
          </div>
          <div class="feature-item">
            <img src="../assets/icons/ic_garage@3x.png" alt="Garage" class="icon" />
            {{ house?.garage ? 'Yes' : 'No' }}
          </div>
        </div>

        <p class="description">{{ house?.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  house: {
    type: null,
    required: true,
  },
})

const formatPrice = (price) => {
  return price?.toLocaleString('nl-NL')
}
</script>

<style scoped>
.main-content {
  background: white;
  overflow: hidden;

  .main-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
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
    }

    .address {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--secondary-text);
    }

    .info-details {
      padding: 5px;
      font-size: small;
      display: flex;
      flex-direction: column;
      gap: 14px;

      .details-grid {
        display: grid;
        grid-template-columns: repeat(3, 90px);

        .detail-item {
          display: flex;
          gap: 8px;

          span {
            font-size: smaller;
            color: var(--secondary-text);
            text-wrap: nowrap;
          }
        }
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(3, 50px);

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }

      .description {
        color: var(--secondary-text);
        line-height: 1.6;
      }
    }
  }
}
</style>
