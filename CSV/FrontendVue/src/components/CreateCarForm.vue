<template>
    <div>
      <h2>Create Car Data</h2>
      <div>
        <label for="name">Nama</label>
        <input type="text" id="name" v-model="carData.name">
      </div>
      <div>
        <label for="brand">Merek</label>
        <input type="text" id="brand" v-model="carData.brand">
      </div>
      <div>
        <label for="model">Model</label>
        <input type="text" id="model" v-model="carData.model">
      </div>
      <div>
        <label for="price">Harga(USD)</label>
        <input type="number" id="price" v-model="carData.price">
      </div>
      <button @click="submitData">Submit</button>
    </div>
  </template>
  
  <script>
import { ref } from 'vue';

export default {
  setup() {
    const carData = ref({
      name: '',
      brand: '',
      model: '',
      price: ''
    });

    const submitData = async () => {
      try {
        const response = await fetch('http://localhost:3000/cars', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(carData.value)
        });

        const result = await response.json();
        alert(result.message);

        // Reset form setelah submit
        carData.value = {
          name: '',
          brand: '',
          model: '',
          price: ''
        };
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit car data.');
      }
    };

    return {
      carData,
      submitData
    };
  }
};
</script>  
  <style scoped>
  label {
    display: block;
    margin-bottom: 12px;
  }
  
  input[type="text"],
  input[type="number"] {
    width: 900px;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>