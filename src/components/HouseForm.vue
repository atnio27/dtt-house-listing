<template>
  <div class="background-wrapper">
    <div class="create-house">
      <BackNavigation />

      <h1 v-if="isEdit === false">Create new listing</h1>
      <h1 v-else>Edit listing</h1>

      <form @submit.prevent="handleSubmit" class="create-form">
        <div class="form-grid">
          <div class="form-group full-width">
            <label for="streetName">Street name*</label>
            <input type="text" id="streetName" v-model="formData.streetName" placeholder="Enter the street name"
              :class="{ error: errors.streetName }" />
            <span class="error-message" v-if="errors.streetName">{{ errors.streetName }}</span>
          </div>

          <div class="form-group">
            <label for="houseNumber">House number*</label>
            <input type="number" id="houseNumber" v-model="formData.houseNumber" placeholder="Enter house number"
              :class="{ error: errors.houseNumber }" />
            <span class="error-message" v-if="errors.houseNumber">{{ errors.houseNumber }}</span>
          </div>

          <div class="form-group">
            <label for="numberAddition">Addition (optional)</label>
            <input type="text" id="numberAddition" v-model="formData.numberAddition" placeholder="e.g. A" />
          </div>

          <div class="form-group full-width">
            <label for="zip">Postal code*</label>
            <input type="text" id="zip" v-model="formData.zip" placeholder="e.g. 1000 AA"
              :class="{ error: errors.zip }" />
            <span class="error-message" v-if="errors.zip">{{ errors.zip }}</span>
          </div>

          <div class="form-group full-width">
            <label for="city">City*</label>
            <input type="text" id="city" v-model="formData.city" placeholder="e.g. Utrecht"
              :class="{ error: errors.city }" />
            <span class="error-message" v-if="errors.city">{{ errors.city }}</span>
          </div>

          <div class="form-group">
            <label>Upload picture (PNG or JPG)*</label>
            <div class="upload-area" :class="{ error: errors.image, 'has-image': imagePreview }"
              @click="triggerFileInput" @dragover.prevent @drop.prevent="handleFileDrop">
              <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/png,image/jpeg"
                class="hidden" />
              <template v-if="imagePreview">
                <img :src="imagePreview" alt="Preview" class="image-preview" />
                <button type="button" class="remove-image" @click.stop="removeImage">×</button>
              </template>
              <template v-else>
                <img src="@/assets/icons/ic_plus_grey@3x.png" alt="Upload" class="upload-icon" />
              </template>
            </div>
            <span class="error-message" v-if="errors.image">{{ errors.image }}</span>
          </div>

          <br />

          <div class="form-group full-width">
            <label for="price">Price*</label>
            <input type="number" id="price" v-model="formData.price" placeholder="e.g. €150.000"
              :class="{ error: errors.price }" />
            <span class="error-message" v-if="errors.price">{{ errors.price }}</span>
          </div>

          <div class="form-group">
            <label for="size">Size*</label>
            <input type="number" id="size" v-model="formData.size" placeholder="e.g. 60m2"
              :class="{ error: errors.size }" />
            <span class="error-message" v-if="errors.size">{{ errors.size }}</span>
          </div>

          <div class="form-group">
            <label for="hasGarage">Garage*</label>
            <select id="hasGarage" v-model="formData.hasGarage" :class="{ error: errors.hasGarage }">
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
            <span class="error-message" v-if="errors.hasGarage">{{ errors.hasGarage }}</span>
          </div>

          <div class="form-group">
            <label for="bedrooms">Bedrooms*</label>
            <input type="number" id="bedrooms" v-model="formData.bedrooms" placeholder="Enter amount"
              :class="{ error: errors.bedrooms }" />
            <span class="error-message" v-if="errors.bedrooms">{{ errors.bedrooms }}</span>
          </div>

          <div class="form-group">
            <label for="bathrooms">Bathrooms*</label>
            <input type="number" id="bathrooms" v-model="formData.bathrooms" placeholder="Enter amount"
              :class="{ error: errors.bathrooms }" />
            <span class="error-message" v-if="errors.bathrooms">{{ errors.bathrooms }}</span>
          </div>

          <div class="form-group full-width">
            <label for="constructionYear">Construction date*</label>
            <input type="number" id="constructionYear" v-model="formData.constructionYear" placeholder="e.g. 1990"
              :class="{ error: errors.constructionYear }" />
            <span class="error-message" v-if="errors.constructionYear">{{
              errors.constructionYear
            }}</span>
          </div>

          <div class="form-group full-width">
            <label for="description">Description*</label>
            <textarea id="description" v-model="formData.description" rows="4" placeholder="Enter description"
              :class="{ error: errors.description }"></textarea>
            <span class="error-message" v-if="errors.description">{{ errors.description }}</span>
          </div>

          <div class="form-group full-width">
            <div class="form-actions">
              <button type="submit" class="submit-button" :disabled="false">
                {{ isSubmitting ? isEdit ? 'Editing...' : 'Creating...' : isEdit ? 'SAVE' : 'POST' }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BackNavigation from '@/components/BackNavigation.vue'
import { useHouseStore } from '@/stores/houseStore'

const props = defineProps({
  isEdit: {
    type: Boolean,
    required: true,
  },
})

const houseStore = useHouseStore()
const router = useRouter()
const fileInput = ref(null)
const imagePreview = ref(null)
const isSubmitting = ref(false)
const route = useRoute()

const formData = reactive({
  price: '20',
  bedrooms: '1',
  bathrooms: '1',
  size: '1',
  streetName: '',
  houseNumber: '21',
  numberAddition: '1',
  zip: '1181TY',
  city: 'Amsterdam',
  constructionYear: '1960',
  hasGarage: false,
  description: 'Nice house!',
  image: null
})

const errors = reactive({})

const validateForm = () => {
  errors.streetName = !formData.streetName ? 'Street name is required' : ''
  errors.houseNumber = !formData.houseNumber ? 'House number is required' : ''
  errors.zip = !formData.zip ? 'Postal code is required' : ''
  errors.city = !formData.city ? 'City is required' : ''
  errors.price = !formData.price ? 'Price is required' : ''
  errors.size = !formData.size ? 'Size is required' : ''
  errors.bedrooms = !formData.bedrooms ? 'Number of bedrooms is required' : ''
  errors.bathrooms = !formData.bathrooms ? 'Number of bathrooms is required' : ''
  errors.constructionYear = !formData.constructionYear ? 'Construction year is required' : ''
  errors.description = !formData.description ? 'Description is required' : ''
  errors.image = !formData.image ? 'Image is required' : ''

  return !Object.values(errors).some((error) => error)
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  handleFile(file)
}

const handleFileDrop = (event) => {
  const file = event.dataTransfer.files[0]
  handleFile(file)
}

const handleFile = (file) => {
  if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
    formData.image = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
    errors.image = ''
  } else {
    errors.image = 'Please upload a valid PNG or JPG image'
  }
}

const removeImage = () => {
  formData.image = null
  imagePreview.value = null
  fileInput.value.value = ''
}

const addHouse = async () => {
  isSubmitting.value = true

  if (!validateForm()) {
    isSubmitting.value = false
    return
  }

  const newHouse = {
    ...formData,
  };

  try {
    const createdHouse = await houseStore.createHouse(newHouse)
    if (formData.image) {
      await houseStore.uploadImage(createdHouse.id, { image: formData.image })
    }
    router.push(`/houses/${createdHouse.id}`)
  } catch (error) {
    console.error('Error creating house:', error)
  } finally {
    isSubmitting.value = false
  }
}

const updateHouse = async () => {
  isSubmitting.value = true

  if (!validateForm()) {
    isSubmitting.value = false
    return
  }

  const updatedHouse = {
    ...formData,
  };

  const houseId = route.params.id

  try {
    await houseStore.updateHouse(updatedHouse, houseId)
    if (formData.image) {
      await houseStore.uploadImage(houseId, { image: formData.image })
    }
    router.push(`/houses/${houseId}`)
  } catch (error) {
    console.error('Error updating house:', error)
  } finally {
    isSubmitting.value = false
  }
}

const handleSubmit = () => {
  if (props.isEdit) {
    updateHouse()
  } else {
    addHouse()
  }
}

const fetchHouseData = async (id) => {
  try {
    await houseStore.fetchHouseById(id)
    if (houseStore.currentHouse) {
      const location = houseStore.currentHouse.location
      formData.streetName = location.street
      formData.houseNumber = location.houseNumber
      formData.numberAddition = location.houseNumberAddition
      formData.zip = location.zip
      formData.city = location.city

      const rooms = houseStore.currentHouse.rooms
      formData.bedrooms = rooms.bedrooms
      formData.bathrooms = rooms.bathrooms
      formData.image = houseStore.currentHouse.image
      imagePreview.value = houseStore.currentHouse.image

      formData.price = houseStore.currentHouse.price
      formData.size = houseStore.currentHouse.size
      formData.hasGarage = houseStore.currentHouse.hasGarage
      formData.constructionYear = houseStore.currentHouse.constructionYear
      formData.description = houseStore.currentHouse.description
    }
  } catch (error) {
    console.error('Error fetching house data:', error)
  }
}

if (props.isEdit) {
  const houseId = route.params.id
  if (houseId) {
    fetchHouseData(houseId)
  }
}
</script>

<style scoped>
.create-house {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.create-form {
  /* background: white; */
  /* padding: 30px; */
  /* border-radius: 8px; */
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: span 2;
}

label {
  font-size: 10px;
  font-weight: 600;
  color: var(--secondary-text);
}

input,
select,
textarea {
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 10px;
  text-align: left;

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 1.5px var(--primary);
  }
}

textarea {
  resize: none;
  height: 100px;
}

.error-message {
  color: red;
  font-size: 12px;
}

.upload-area {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--tertiary-1);
  border-radius: 10px;
  padding: 5px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  width: 100px;
  height: 100px;

  &:hover {
    border-color: var(--primary);
  }

  &.error {
    border-color: var(--primary);
  }

  &.has-image {
    padding: 0;
    border-style: solid;
  }
}

.error {
  color: var(--secondary-text);
}

.hidden {
  display: none;
}

.upload-icon {
  width: 24px;
  height: 24px;
  /* margin-bottom: 8px; */
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.remove-image {
  position: absolute;
  top: -10px;
  right: -10px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 18px;
  font-weight: lighter;
  color: lightgray;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: var(--tertiary-1);
  }
}

.form-actions {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

.submit-button {
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 40px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 50%;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: var(--tertiary-2);
    cursor: not-allowed;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full-width {
    grid-column: span 1;
  }
}

.background-wrapper {
  position: relative;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-image: url('../assets/icons/img_background@3x.png');
}
</style>
