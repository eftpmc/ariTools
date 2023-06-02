import { createRouter, createWebHistory } from 'vue-router';
import Movies from './views/Movies.vue';
import Books from './views/Books.vue';
import Anime from './views/Anime.vue';
import Home from './views/Home.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/movies',
    component: Movies,
  },
  {
    path: '/books',
    component: Books,
  },
  {
    path: '/anime',
    component: Anime,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
