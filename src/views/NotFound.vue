<template>
    <div class="div">nothing here dipshit</div>
</template>
  
<script>
export default {
    name: 'NotFound',
    methods: {
        navigateTo(path) {
            this.$router.replace(path);
        }
    }
};
</script>
  
<style scoped>
.div{
    color: white;
    font-size:x-large;
}
</style>
  