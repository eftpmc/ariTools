<template>
  <div class="app">
    <div class="content">
      <Button imageSrc="/movie.svg"/>
      <div class="button-spacing"></div>
      <Button imageSrc="/book.svg"/>
      <div class="button-spacing"></div>
      <Button imageSrc="/japn.svg"/>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'App',
  components: {
    Button,
  },
};
</script>

<style>
.app {
  background-color: #1A120B;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

</style>
