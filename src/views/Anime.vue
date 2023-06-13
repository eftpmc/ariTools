<template>
  <div class="anime-view">
    <HomeButton />
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search anime..." />
      <button @click="handleSearchInput">S</button>
    </div>
    <div v-if="searchResults.length > 0" class="search-results">
      <button v-for="result in searchResults" :key="result.id" class="search-result"
        @click="fetchIframeSource(result.id)">
        <p class="search-result-text">{{ result.title }}</p>
      </button>
    </div>
  </div>
</template>

<script>
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
      searchRequestController: null,
    };
  },
  mounted() {
    this.fetchAnimeData();
  },
  methods: {
    fetchAnimeData() {
      // Fetching anime data on component mount (if needed)
    },

    handleSearchInput() {
      if (this.searchRequestController) {
        // Abort the previous request if it exists
        this.searchRequestController.abort();
      }

      this.searchRequestController = new AbortController();
      const signal = this.searchRequestController.signal;

      const query = this.searchQuery.trim();
      if (query === '') {
        this.searchResults = [];
        return;
      }

      const searchUrl = `https://arpi-api.herokuapp.com/api/anime/pahe/search/${encodeURIComponent(query)}`;

      fetch(searchUrl, { signal })
        .then((response) => response.json())
        .then((data) => {
          const topThreeResults = this.getTopThreeResults(data);
          this.searchResults = topThreeResults.map((result) => ({
            id: result.id,
            title: result.title || 'No Title',
            link: result.link || '',
          }));
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            // Request was aborted, ignore the error
            return;
          }
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

    fetchIframeSource(id) {
      // Placeholder function
      console.log(`Fetching Iframe Source for id: ${id}`);
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

.search-bar button {
  width: 40px;
  height: 40px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.search-bar button:hover {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.search-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 300px;
}

.search-result {
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 5px;
  width: 100%;
  border: 0;
  outline: 0;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.search-result:hover {
  transform: scale(1.1);
  background-color: var(--secondary-color);
}

.search-result:hover .search-result-text {
  color: var(--primary-color);
}

.search-result-text {
  color: var(--secondary-color);
  font-size: 16px;
  margin: 0;
  padding: 0 10px;
  border-radius: 5px;
}
</style>
