<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">Delete Car Data</h1>
    <p class="text-gray-600 mb-6">Masukkan ID mobil yang ingin dihapus.</p>

    <form class="space-y-4">
      <input v-model="carId" type="text" class="w-full p-2 border rounded" placeholder="Car ID" />
      <button @click.prevent="initiateDelete" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Delete
      </button>
    </form>

    <div v-if="confirmationMessage" class="mt-4 p-4 bg-yellow-200 text-yellow-800 rounded shadow-lg">
      <p>{{ confirmationMessage }}</p>
      <div class="mt-2">
        <button @click="confirmDelete" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2">
          Ya
        </button>
        <button @click="cancelDelete" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Tidak
        </button>
      </div>
    </div>

    <div v-if="successMessage" class="mt-4 p-4 bg-green-200 text-green-800 rounded shadow-lg">
      <p>{{ successMessage }}</p>
    </div>
    <div v-if="errorMessage" class="mt-4 p-4 bg-red-200 text-red-800 rounded shadow-lg">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const carId = ref('')
const confirmationMessage = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const initiateDelete = () => {
  confirmationMessage.value = `Apakah kamu yakin ingin menghapus mobil dengan ID ${carId.value}?`
}

const confirmDelete = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await fetch(`http://localhost:3000/cars/${carId.value}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete car')
    }

    const data = await response.json()
    successMessage.value = `Mobil dengan ID ${carId.value} berhasil dihapus!`
    console.log('Response:', data)

    // Reset form dan pesan konfirmasi
    carId.value = ''
    confirmationMessage.value = ''
  } catch (err) {
    console.error('Error:', err)
    errorMessage.value = 'Gagal menghapus mobil. Pastikan ID benar.'
  }
}

const cancelDelete = () => {
  confirmationMessage.value = ''
}
</script>
