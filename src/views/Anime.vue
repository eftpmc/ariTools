<template>
  <div class="anime-view">
    <HomeButton />
    <div class="anime-grid-wrapper">
      <div class="anime-grid" ref="animeGrid">
        <div v-for="anime in animeList" :key="anime.id" class="anime-button">
          <button class="button-image" @mouseover="showTitle(anime)" @mouseleave="hideTitle()">
            <div class="button-image-wrapper">
              <img :src="anime.image" alt="Anime Image" draggable="false" />
            </div>
          </button>
        </div>
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
      const pagePromises = [];
      for (let page = 1; page <= 10; page++) {
        const promise = axios.get(`https://gotaku1.com/popular?page=${page}`);
        pagePromises.push(promise);
      }

      Promise.all(pagePromises)
        .then((responses) => {
          const htmlPages = responses.map((response) => response.data);
          this.parseAnimeData(htmlPages);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    parseAnimeData(htmlPages) {
      const animeList = [];
      htmlPages.forEach((html) => {
        const $ = cheerio.load(html);
        const pageAnimeList = $('.video-block')
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
        animeList.push(...pageAnimeList);
      });

      this.animeList = animeList;

      this.$nextTick(() => {
        const columns = animeList.length;
        this.$refs.animeGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
      });
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
  overflow-x: auto;
}

.anime-grid-wrapper {
  display: flex;
}

.anime-grid {
  display: inline-flex;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
}

.anime-button {
  position: relative;
  display: inline-block;
}

.button-image {
  width: 200px;
  height: 300px; /* 2:3 aspect ratio */
  overflow: hidden;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 5%;
  transition: transform 0.3s ease-in-out;
}

.button-image-wrapper {
  width: 100%;
  height: 0;
  padding-bottom: 150%; /* 2:3 aspect ratio */
  position: relative;
}

.button-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.hover-text {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--primary-color);
  font-size: 24px;
}
</style>
