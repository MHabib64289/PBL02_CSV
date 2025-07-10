<template>
  <div>
    <h2>Car List</h2>
    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Merek</th>
          <th>Model</th>
          <th>Harga</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(car, index) in carData" :key="car.id">
          <td>{{ car.id }}</td>
          <td>{{ car.name }}</td>
          <td>{{ car.brand }}</td>
          <td>{{ car.model }}</td>
          <td>{{ car.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const carData = ref([]);

    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3000/cars');
        carData.value = await response.json();
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    onMounted(() => {
      fetchCars();
    });

    return {
      carData,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f0f0f0;
}
</style>
