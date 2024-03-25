import { createRouter, createWebHistory } from "vue-router";

import ViewHome from '../views/ViewHome.vue';
import ViewAboutme from '../views/ViewAboutMe.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ViewHome
  },
  {
    path: '/about',
    name: 'About',
    component: ViewAboutme
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

