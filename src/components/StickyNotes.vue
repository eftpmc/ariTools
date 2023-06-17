<template>
    <div class="sticky-notes">
        <button class="sticky-note note1" @click="navigateTo('/anime')">
            <img src="/anime.png" alt="Sticky Note 1">
        </button>
        <button class="sticky-note note2" @click="navigateTo('/movies')">
            <img src="/movie.png" alt="Sticky Note 2">
        </button>
        <button class="sticky-note note3" @click="navigateTo('/books')">
            <img src="/book.png" alt="Sticky Note 3">
        </button>
    </div>
</template>
  
<script>
export default {
    name: 'StickyNotes',
    methods: {
        navigateTo(path) {
            this.$emit('navigateTo', path);
        }
    }
};
</script>
  
<style scoped>
.sticky-notes {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    height: 100vh;
    width: 100%;
    pointer-events: none;
}

.sticky-note {
    max-width: 300px;
    width: 30%;
    height: auto;
    margin: 10px;
    position: absolute;
    z-index: 4;
    filter: brightness(.4);
    transition: transform 0.3s, filter 0.3s;
    border: none;
    background: none;
    cursor: pointer;
    pointer-events: auto;
}

.sticky-note img {
    max-width: 100%;
    height: auto;
}

.sticky-note:focus {
    outline: none;
}

.sticky-note:hover {
    filter: brightness(.7);
}

.note1 {
    transform: rotate(-20deg) translateX(-50%) translateY(-50%);
    top: 22%;
    left: 25%;
}

.note2 {
    transform: rotate(15deg) translateX(-50%) translateY(-50%);
    top: 20%;
    left: 70%;
}

.note3 {
    transform: rotate(-5deg) translateX(-50%) translateY(-50%);
    top: 70%;
    left: 10%;
}
</style>
  