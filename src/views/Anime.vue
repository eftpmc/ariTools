<template>
  <div class="search-box">
    <input class="search-input" type="text" placeholder="Search" v-model="searchQuery" @keydown.enter="performSearch" />
  </div>
</template>

<script>
export default {
  name: 'Anime',
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    performSearch() {
      if (this.searchQuery.trim() !== '') {
        // Navigate to a new view and pass the search query as a parameter
        this.$router.push({
          name: 'SearchResults',
          params: { query: this.searchQuery },
        });
      }
    },
  },
};
</script>

<style scoped>
.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  width: 200px;
  height: 30px;
  padding: 5px;
  font-size: 16px;
}
</style>
