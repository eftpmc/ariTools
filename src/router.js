import { createRouter, createWebHistory } from 'vue-router';
import Movies from './views/Movies.vue';
import Books from './views/Books.vue';
import Anime from './views/Anime.vue';
import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';
import AnimeSearchResults from './views/AnimeSearchResults.vue';
import MovieSearchResults from './views/MovieSearchResults.vue';

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
    path: '/anime/search/:query/:episode',
    name: 'AnimeSearchResults',
    component: AnimeSearchResults,
    props: true,
  },
  {
    path: '/movies/search/:query',
    name: 'MovieSearchResults',
    component: MovieSearchResults,
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
