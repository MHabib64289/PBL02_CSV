<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-6">Cari Mobil</h1>

    <input
      v-model="search"
      type="text"
      placeholder="Cari nama atau merek..."
      class="border p-2 rounded w-full mb-4"
      @input="fetchCars"
    />

    <div v-if="cars.length" class="space-y-4">
      <div v-for="car in cars" :key="car.id" class="border p-4 rounded shadow">
        <h2 class="text-xl font-semibold">{{ car.name }}</h2>
        <p class="text-gray-600">Merek: {{ car.brand }}</p>
        <p class="text-gray-600">Model: {{ car.model }}</p>
        <p class="text-gray-600">Harga: Rp {{ car.price }}</p>
      </div>
    </div>

    <p v-else class="text-center text-gray-500 mt-8">Mobil tidak ditemukan.</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");
const cars = ref([]);

const fetchCars = async () => {
  if (search.value.trim() === "") {
    cars.value = []; // Kalau kosong, jangan fetch apa-apa
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/cars?search=${search.value}`
    );
    cars.value = await response.json();
  } catch (error) {
    console.error("Gagal fetch mobil:", error);
  }
};
</script>
