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
        'Problemløser',
        'Pappa',
        'Lærevillig',
        'Frontend Utvikler',
        'Eventyrlysten',
        'Løper',
        'Gladlaks',
        '11 412 dager gammel',
        'Innovativ',
        'Frontend Utvikler',
        'Jeger',
        'Samarbeidsvillig',
        'Hundeeier',
      ]);
      const displayedText = ref('Jeg er ');
      const typingSpeed = 120;
      const pauseBetweenTexts = 1500;
  
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
        /* displayedText.value = 'Jeg er '; */
        displayTexts(); 
      }
  
      onMounted(() => {
        displayTexts();
      });
  
      return { displayedText };
    },
  };
  </script>
  