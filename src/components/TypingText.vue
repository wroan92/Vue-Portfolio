<template>
      <div class="fake-input">
      {{ displayedText }}
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'TypingText',
  
    setup() {
      const texts = ref([
        'Frontend Utvikler',
        'Pappa',
        'Gladlaks',
        'Lærer',
        'Jeger',
        'Løper',
        'Syklist',
        'Pappa til en hund'
      ]);
      const displayedText = ref('Jeg er ');
      const typingSpeed = 150;
      const pauseBetweenTexts = 2000;
  
      async function typeText(text: string) {
        for (let i = 0; i <= text.length; i++) {
          displayedText.value = 'Jeg er ' + text.substring(0, i);
          await new Promise(resolve => setTimeout(resolve, typingSpeed));
        }
      }
  
      async function displayTexts() {
        for (const text of texts.value) {
          await typeText(text);
          await new Promise(resolve => setTimeout(resolve, pauseBetweenTexts));
        }
        displayedText.value = 'Jeg er ';
        displayTexts(); // Gjenta prosessen
      }
  
      onMounted(() => {
        displayTexts();
      });
  
      return { displayedText };
    },
  };
  </script>
  
  <style scoped>
.fake-input {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px solid #000000;
  border-radius: 40px;
  white-space: pre;
  width: 60vw;
  max-width: 1000px;
  min-height: 45px;
  text-align: center;
}
  </style>
  