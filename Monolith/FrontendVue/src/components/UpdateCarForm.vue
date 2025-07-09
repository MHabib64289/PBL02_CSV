<template>
    <div>
      <h2>Edit Car</h2>
      <form @submit.prevent="updateCar">
        <label for="name">Car Nama</label>
        <input type="text" id="name" v-model="carData.name" required />
        
        <label for="brand">Merek</label>
        <input type="text" id="brand" v-model="carData.brand" required />
        
        <label for="model">Model</label>
        <input type="text" id="model" v-model="carData.model" required />
        
        <label for="price">Harga</label>
        <input type="number" id="price" v-model="carData.price" required />
  
        <button type="submit">Simpan</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        carData: {
          id: '',
          name: '',
          brand: '',
          model: '',
          price: ''
        }
      };
    },
    created() {
      this.fetchCarData();
    },
    methods: {
      async fetchCarData() {
        const route = useRoute();
        const carId = route.params.id;  // ID dari URL
        try {
          const response = await fetch(`http://localhost:3000/cars/${carId}`);
          const data = await response.json();
          this.carData = data;
        } catch (error) {
          console.error('Error fetching car data:', error);
        }
      },
      async updateCar() {
        try {
          const response = await fetch(`http://localhost:3000/cars/${this.carData.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.carData)
          });
  
          if (response.ok) {
            this.$router.push('/view');  // Redirect ke halaman view setelah update
          } else {
            alert('Failed to update car data');
          }
        } catch (error) {
          console.error('Error updating car data:', error);
        }
      }
    }
  };
  </script>
  