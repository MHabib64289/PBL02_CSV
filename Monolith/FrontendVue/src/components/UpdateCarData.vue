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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(car, index) in carData" :key="car.id">
          <td>{{ car.id }}</td>
          <td>{{ car.name }}</td>
          <td>{{ car.brand }}</td>
          <td>{{ car.model }}</td>
          <td>{{ car.price }}</td>
          <td>
            <button @click="editCar(car)">Edit</button> <!-- Tombol Edit -->
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Form Edit mobil -->
    <div v-if="isEditing" class="edit-form">
      <h3>Edit Car</h3>
      <form @submit.prevent="updateCar">
        <label for="name">Name:</label>
        <input type="text" v-model="carToEdit.name" id="name" required />

        <label for="brand">Brand:</label>
        <input type="text" v-model="carToEdit.brand" id="brand" required />

        <label for="model">Model:</label>
        <input type="text" v-model="carToEdit.model" id="model" required />

        <label for="price">Price:</label>
        <input type="number" v-model="carToEdit.price" id="price" required />

        <button type="submit">Update Car</button>
        <button type="button" @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const carData = ref([]);
    const isEditing = ref(false);
    const carToEdit = ref(null); // Untuk menyimpan data mobil yang akan diedit

    // Fungsi untuk mengambil data mobil
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3000/cars');
        carData.value = await response.json();
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    // Fungsi untuk mengisi form dengan data mobil yang dipilih
    const editCar = (car) => {
      carToEdit.value = { ...car }; // Salin data car ke carToEdit
      isEditing.value = true; // Tampilkan form edit
    };

    // Fungsi untuk memperbarui mobil
    const updateCar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cars/${carToEdit.value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(carToEdit.value),
        });

        if (response.ok) {
          // Setelah update berhasil, ambil data mobil lagi
          await fetchCars();
          isEditing.value = false; // Sembunyikan form edit
        }
      } catch (error) {
        console.error('Error updating car:', error);
      }
    };

    // Fungsi untuk membatalkan edit
    const cancelEdit = () => {
      isEditing.value = false; // Sembunyikan form edit tanpa menyimpan perubahan
    };

    // Mengambil data mobil saat komponen dimuat
    onMounted(() => {
      fetchCars();
    });

    return {
      carData,
      isEditing,
      carToEdit,
      editCar,
      updateCar,
      cancelEdit,
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

.edit-form {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  width: 300px;
}

.edit-form input {
  margin-bottom: 10px;
  width: 100%;
  padding: 5px;
}

.edit-form button {
  margin-right: 10px;
}
</style>
