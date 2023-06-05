<template>
  <div class="anime-view">
    <HomeButton />
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search anime..." @input="searchAnime" />
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
      searchQuery: '',
      searchResults: [],
    };
  },
  mounted() {
    this.fetchAnimeData();
  },
  methods: {
    fetchAnimeData() {
      // Fetching anime data on component mount (if needed)
    },

    searchAnime() {
      const query = this.searchQuery.trim();
      if (query === '') {
        this.searchResults = [];
        return;
      }

      const searchUrl = `https://gotaku1.com/search.html?keyword=${encodeURIComponent(query)}`;
      axios
        .get(searchUrl)
        .then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
          const searchResults = $('.video-block')
            .map((_, element) => {
              const title = $(element).find('.name').text().trim();
              return {
                id: _.toString(),
                title: this.removeEpisodeNumber(title) || 'No Title',
              };
            })
            .get();

          this.searchResults = this.getTopThreeResults(searchResults);
        })
        .catch((error) => {
          console.error(error);
          this.searchResults = [];
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

.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

.search-bar input:focus {
  outline: none;
}

.search-bar input {
  background-color: var(--primary-color);
  color: var(--secondary-color);
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin: auto;
}

.search-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 300px;
}

.search-result {
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.search-result-text {
  color: var(--secondary-color);
  font-size: 16px;
  margin: 0;
  padding: 0 10px;
  border-radius: 5px;
}
</style>
