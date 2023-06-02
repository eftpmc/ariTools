<template>
  <div class="home">
    <div class="content">
      <Button label="M" @mouseover="handleButtonHover('Movies')" @mouseleave="handleButtonLeave" @click="navigateTo('/movies')" />
      <div class="button-spacing"></div>
      <Button label="B" @mouseover="handleButtonHover('Books')" @mouseleave="handleButtonLeave" @click="navigateTo('/books')" />
      <div class="button-spacing"></div>
      <Button label="A" @mouseover="handleButtonHover('Anime')" @mouseleave="handleButtonLeave" @click="navigateTo('/anime')" />
    </div>
    <div v-if="hoveredButton" class="hover-text">
      <p>{{ hoveredButton }}</p>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Home',
  components: {
    Button,
  },
  data() {
    return {
      hoveredButton: null,
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.replace(path);
    },
    handleButtonHover(buttonName) {
      this.hoveredButton = buttonName;
    },
    handleButtonLeave() {
      this.hoveredButton = null;
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: row;
}

.button-spacing {
  width: 20px;
}

.hover-text {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--primary-color);
  font-size: 24px;
}
</style>
