<template>
  <div id="app">
    <header>
      <h1>Monolith | Car Project</h1>
      <nav>
        <router-link to="/create" class="nav-link">Create</router-link> |
        <router-link to="/view" class="nav-link">Read</router-link> |
        <router-link to="/update" class="nav-link">Update</router-link> |
        <router-link to="/delete" class="nav-link">Delete</router-link> |
        <router-link to="/search" class="nav-link">Search</router-link>
      </nav>
    </header>
    <main>
      <router-view /> <!-- Halaman akan dirender berdasarkan URL yang dipilih -->
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();
    const carData = ref({
      id: '',
      name: '',
      brand: '',
      model: '',
      price: ''
    });

    // Fungsi untuk mengupdate data mobil
    const updateCar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cars/${carData.value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(carData.value),
        });
        
        if (response.ok) {
          alert('Car data updated successfully!');
          router.push('/view'); // Navigasi ke halaman daftar mobil setelah berhasil update
        } else {
          alert('Failed to update car data');
        }
      } catch (error) {
        console.error('Error updating car data:', error);
        alert('Error updating car data');
      }
    };

    // Fungsi untuk memuat data mobil yang akan diedit
    const fetchCarData = async (carId) => {
      try {
        const response = await fetch(`http://localhost:3000/cars/${carId}`);
        const data = await response.json();
        carData.value = data;
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    // Memanggil fetchCarData saat halaman update dimuat
    const carId = router.currentRoute.value.params.id; // Mendapatkan ID mobil dari URL
    if (carId) {
      fetchCarData(carId);
    }

    return {
      carData,
      updateCar
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  margin: 0;
  font-size: 2rem;
  color: #343a40;
}

header nav {
  margin-top: 10px;
  font-size: 1rem;
}

header nav a {
  margin-right: 15px;
  text-decoration: none;
  color: #007bff;
}

header nav a:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
  background-color: #f1f1f1;
}

.nav-link {
  color: #007bff;
}

.nav-link:hover {
  color: #0056b3;
}
</style>
