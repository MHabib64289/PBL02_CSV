import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Impor instance router

const app = createApp(App);
app.use(router); // Gunakan router di aplikasi Vue
app.mount('#app');