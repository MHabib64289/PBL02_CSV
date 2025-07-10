import { createRouter, createWebHistory } from 'vue-router';
import CreateCarForm from '../components/CreateCarForm.vue';
import ViewCarData from '../components/ViewCarData.vue';
import UpdateCarForm from '../components/UpdateCarForm.vue';
import DeleteCarData from '../components/DeleteCarData.vue';
import SearchCarData from '../components/SearchCarData.vue';
import UpdateCarData from '../components/UpdateCarData.vue';

const routes = [
  {
    path: '/create',
    name: 'Create',
    component: CreateCarForm,
  },
  {
    path: '/view',
    name: 'View',
    component: ViewCarData,
  },
  {
    path: '/update',
    name: 'Update',
    component: UpdateCarData,
  },
  {
    path: '/delete',
    name: 'Delete',
    component: DeleteCarData,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchCarData,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;