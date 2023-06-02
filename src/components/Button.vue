<template>
  <button class="custom-button" @click="handleClick" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <span class="button-label">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      // Handle button click event
      console.log('Button clicked!');
    },
    handleMouseOver() {
      this.$emit('mouseover');
    },
    handleMouseLeave() {
      this.$emit('mouseleave');
    },
  },
};
</script>

<style scoped>
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: none;
  border-radius: 5%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  padding: 20px;
}

.custom-button:hover {
  background-color: var(--secondary-color);
  transform: scale(1.1);
}

.button-label {
  font-size: 48px;
  transition: color 0.3s ease-in-out;
}

.custom-button:hover .button-label {
  color: var(--primary-color);
}
</style>
