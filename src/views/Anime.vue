<template>
  <div class="anime-view">
    <HomeButton />
    <h1 class="page-title secondary-color">Anime View</h1>
    <div class="anime-grid">
      <div v-for="anime in animeList" :key="anime.id" class="anime-button">
        <button class="button-image" @mouseover="showTitle(anime)" @mouseleave="hideTitle">
          <img :src="anime.image" alt="Anime Image" />
        </button>
      </div>
    </div>
    <div v-if="hoveredAnime" class="hover-text">
      <p>{{ removeEpisodeNumber(hoveredAnime.title) }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import cheerio from 'cheerio';
import HomeButton from '@/components/HomeButton.vue';

export default {
  name: 'Anime',
  components: {
    HomeButton,
  },
  data() {
    return {
      animeList: [],
      hoveredAnime: null,
    };
  },
  mounted() {
    this.fetchAnimeData();
  },
  methods: {
    fetchAnimeData() {
      axios
        .get('https://gotaku1.com/popular')
        .then((response) => {
          this.parseAnimeData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    parseAnimeData(html) {
      const $ = cheerio.load(html);
      const animeList = $('.video-block')
        .map((_, element) => {
          const image = $(element).find('img').attr('src');
          const title = $(element).find('.name').text().trim();
          const cleanedTitle = this.removeEpisodeNumber(title);
          return {
            id: _.toString(),
            image: image || '',
            title: cleanedTitle || 'No Title',
          };
        })
        .get();
      this.animeList = animeList;
    },
    showTitle(anime) {
      this.hoveredAnime = anime;
    },
    hideTitle() {
      this.hoveredAnime = null;
    },
    removeEpisodeNumber(title) {
      return title.replace(/episode[\s\d.]+$/i, '').trim();
    },
  },
};
</script>

<style scoped>
.anime-view {
  position: relative;
  text-align: center;
}

.page-title {
  font-size: 24px;
  color: var(--secondary-color);
  margin-bottom: 20px;
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 10px;
  justify-items: center;
}

.anime-button {
  position: relative;
}

.button-image {
  width: 100px;
  height: 100px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  border: none; /* Remove any border */
  border-radius: 5%; /* Add border radius of 5% */
}

.button-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hover-text {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--primary-color); /* Set primary color for hover label */
  font-size: 24px;
}
</style>
