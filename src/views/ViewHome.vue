<script setup lang="ts">
import ColoredLetters from '../components/ColoredLetters.vue';
import TypingText from '../components/TypingText.vue';
import ButtonPrimary from '../components/Buttons/BtnPrimary.vue';
</script>

<template>
  <ColoredLetters/>
  <TypingText />
  <ButtonPrimary :button-text="'Lag en nettside'" :to="'/contactForm'"/>
  <ButtonPrimary :button-text="'Jeg prøver lykken'" :to="'/about'"/>
</template>
