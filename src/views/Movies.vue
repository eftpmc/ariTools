<template>
  <div>
    <HomeButton />
    <h1>Movies View</h1>
    <!-- Add your movies content here -->
  </div>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue';

export default {
  name: 'Movies',
  components: {
    HomeButton,
  },
};
</script>
