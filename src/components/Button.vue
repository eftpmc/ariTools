<template>
  <button class="custom-button" @click="handleClick">
    <div class="button-icon">
      <img :src="imageSrc" alt="Button Icon">
    </div>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      // Handle button click event
      console.log('Button clicked!');
    },
  },
};
</script>

<style>
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: #D5CEA3;
  color: white;
  border: none;
  border-radius: 5%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.custom-button:hover {
  background-color: #3C2A21;
  transform: scale(1.1);
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.button-icon img {
  max-width: 100%;
  max-height: 100%;
  transition: fill 0.3s ease-in-out;
  filter: invert(7%) sepia(34%) saturate(622%) hue-rotate(346deg) brightness(93%) contrast(98%);
}

.custom-button:hover .button-icon img {
  filter: invert(96%) sepia(16%) saturate(692%) hue-rotate(337deg) brightness(88%) contrast(89%);
}

</style>
