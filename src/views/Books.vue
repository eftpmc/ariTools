<template>
  <div>
    <HomeButton />
    <h1>Books View</h1>
    <!-- Add your books content here -->
  </div>
</template>

<script>
import HomeButton from '@/components/HomeButton.vue';

export default {
  name: 'Books',
  components: {
    HomeButton,
  },
};
</script>
