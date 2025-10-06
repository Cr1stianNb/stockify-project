import { createRouter, createWebHistory } from 'vue-router'
import ProductView from '../views/ProductView.vue'
import Home from '@/views/Home.vue'

const routes = [
  { path: '/', component: ProductView },
  { path: '/home', component: Home}
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
