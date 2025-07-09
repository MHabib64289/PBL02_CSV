const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ✅ Ini cars awal kosong, SEKALI SAJA
let cars = [];

// Tambah mobil
app.post('/cars', (req, res) => {
  const { name, brand, model, price } = req.body;
  const newCar = {
    id: cars.length ? cars[cars.length - 1].id + 1 : 1,
    name,
    brand,
    model,
    price
  };
  cars.push(newCar);
  res.status(201).json({ message: 'Car added successfully', car: newCar });
});

// Cari mobil / ambil semua mobil
app.get('/cars', (req, res) => {
  let result = cars; // langsung gunakan

  if (req.query.search) {
    const keyword = req.query.search.toLowerCase();
    result = cars.filter(car =>
      car.name.toLowerCase().includes(keyword) ||
      car.brand.toLowerCase().includes(keyword)
    );
  }

  res.json(result);
});

// Update mobil
app.put('/cars/:id', (req, res) => {
  const carId = parseInt(req.params.id);
  const updatedCar = req.body;

  const index = cars.findIndex(car => car.id === carId);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...updatedCar };
    res.json({ message: 'Car updated successfully', car: cars[index] });
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

// Hapus mobil
app.delete('/cars/:id', (req, res) => {
  const carId = parseInt(req.params.id);
  const index = cars.findIndex(car => car.id === carId);
  if (index !== -1) {
    const deletedCar = cars.splice(index, 1);
    res.json({ message: 'Car deleted successfully', car: deletedCar[0] });
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
