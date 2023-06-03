<template>
  <div class="anime-view">
    <HomeButton />
    <div class="anime-grid" ref="animeGrid" @mousedown="startDragging" @mousemove="drag" @mouseup="stopDragging">
      <div v-for="anime in animeList" :key="anime.id" class="anime-button">
        <button :class="{ 'dragging': isDragging }" class="button-image" @mouseover="showTitle(anime)"
          @mouseleave="hideTitle">
          <img :src="anime.image" alt="Anime Image" draggable="false" />
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
      isDragging: false,
      startX: 0,
      currentX: 0,
      animeGridX: 0,
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
        const columns = Math.ceil(animeList.length / 3);
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
    startDragging(event) {
      this.isDragging = true;
      this.startX = event.clientX;
    },
    drag(event) {
      if (this.isDragging) {
        const moveX = event.clientX - this.startX;
        this.currentX = this.animeGridX + moveX;
        this.$refs.animeGrid.style.transform = `translateX(${this.currentX}px)`;
      }
    },
    stopDragging() {
      if (this.isDragging) {
        this.animeGridX = this.currentX;
        this.isDragging = false;
      }
    },
  },
};
</script>

<style scoped>
.anime-view {
  position: relative;
  text-align: center;
}

.anime-grid {
  display: grid;
  grid-gap: 10px;
  justify-items: center;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  white-space: nowrap;
  cursor: grab;
}

.anime-button {
  position: relative;
  display: inline-block;
}

.button-image {
  width: 200px;
  height: 200px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 5%;
  transition: transform 0.3s ease-in-out;
  /* Add transition for smooth scaling */
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
  color: var(--primary-color);
  font-size: 24px;
}

.dragging {
  opacity: 1 !important;
}
</style>
