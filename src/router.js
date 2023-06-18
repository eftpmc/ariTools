import { createRouter, createWebHistory } from 'vue-router';
import Movies from './views/Movies.vue';
import Books from './views/Books.vue';
import Anime from './views/Anime.vue';
import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';
import SearchResults from './views/SearchResults.vue';

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
  {
    path: '/search/:query/:episode',
    name: 'SearchResults',
    component: SearchResults,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
