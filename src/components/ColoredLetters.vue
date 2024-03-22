<script setup lang="ts">
import { ref } from 'vue';

const letterColors = {
  A: '#4285F4', // Blå
  n: '#EA4335', // Rød
  d: '#FBBC04', // Gul
  e: '#4285F4', // Blå
  r: '#34A853', // Grønn
  s: '#EA4335'  // Rød
};

const name = 'Anders';
const coloredLetters = ref(name.split('').map(letter => ({
  letter,
  color: letterColors[letter as keyof typeof letterColors] || '#000000'
})));
</script>

<template>
      <div id="nameContainer">
    <section id="firstNameContainer">
    <span v-for="(item, index) in coloredLetters" :key="index" :style="{ color: item.color }">
      {{ item.letter }}
    </span>
  </section>
    <section id="lastNameContainer">
      Wroldsen
    </section>
  </div>
</template>

<style scoped>
#firstNameContainer {
  font-size: 4em;
  font-weight: bold;
  margin-bottom: -20px;
}
#lastNameContainer {
  position: relative;
  left: 70px;
  font-size: 2em;
  font-weight: bold;
  color: #4285F4;
  margin-bottom: 20px;
}

#btnContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
</style>