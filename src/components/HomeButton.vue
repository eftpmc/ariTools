<template>
    <button class="home-button" @click="navigateToHome" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
      H
    </button>
  </template>
  
  <script>
  export default {
    name: 'HomeButton',
    methods: {
      navigateToHome() {
        this.$router.push('/');
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
  .home-button {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  }
  
  .home-button:hover {
    background-color: var(--secondary-color);
    color: var(--primary-color);
    transform: scale(1.1);
  }
  </style>
  