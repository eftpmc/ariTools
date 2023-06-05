<template>
  <div class="anime-view">
    <HomeButton />
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search anime..."
        @focus="removeInputOutline"
      />
      <button class="search-button" @click="searchAnime">
        S
      </button>
    </div>
    <div v-if="searchResults.length > 0" class="search-results">
      <div v-for="result in searchResults" :key="result.id" class="search-result">
        <p class="search-result-text">{{ result.title }}</p>
      </div>
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
      searchQuery: '',
      searchResults: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchAnimeData();
  },
  methods: {
    fetchAnimeData() {
      // Fetching anime data on component mount (if needed)
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

    searchAnime() {
      if (this.searchQuery.trim() === '') {
        this.searchResults = [];
        return;
      }

      this.loading = true;

      const searchUrl = `https://gotaku1.com/search.html?keyword=${encodeURIComponent(this.searchQuery)}`;
      axios
        .get(searchUrl)
        .then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
          const searchResults = $('.video-block')
            .map((_, element) => {
              const title = $(element).find('.name').text().trim();
              const cleanedTitle = this.removeEpisodeNumber(title);
              return {
                id: _.toString(),
                title: cleanedTitle || 'No Title',
              };
            })
            .get();

          const topThreeResults = this.getTopThreeResults(searchResults);
          this.searchResults = topThreeResults;
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
          this.searchResults = [];
          this.loading = false;
        });
    },

    getTopThreeResults(searchResults) {
      const query = this.searchQuery.toLowerCase();
      searchResults.sort((a, b) => {
        const scoreA = this.calculateSimilarityScore(query, a.title.toLowerCase());
        const scoreB = this.calculateSimilarityScore(query, b.title.toLowerCase());
        return scoreB - scoreA; // Sort in descending order of similarity score
      });
      return searchResults.slice(0, 3); // Return the top three results
    },

    calculateSimilarityScore(query, title) {
      let score = 0;
      for (let i = 0; i < query.length; i++) {
        if (title.includes(query[i])) {
          score++;
        }
      }
      return score;
    },

    removeInputOutline() {
      // Remove outline when input is focused
      const input = document.querySelector('.search-bar input');
      if (input) {
        input.style.outline = 'none';
      }
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

.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar input {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
}

.search-bar input:focus {
  outline: none;
}

.search-button {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  padding: 10px 15px;
}

.search-button:hover {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.search-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.search-result {
  background-color: var(--primary-color);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
}

.search-result-text {
  color: var(--secondary-color);
  font-size: 16px;
  margin: 0;
  padding: 0 10px;
  border-radius: 5px;
}
</style>
