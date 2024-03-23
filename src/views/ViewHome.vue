<script setup lang="ts">
import { ref } from 'vue';
import ColoredLetters from '../components/ColoredLetters.vue';
import TypingText from '../components/TypingText.vue';
import ButtonPrimary from '../components/Buttons/BtnPrimary.vue';
import ContactFormModal from '../components/Modal/ContactFormModal.vue';

const isModalVisible = ref(false);

function showModal() {
  isModalVisible.value = true;
}
</script>

<template>
  <ColoredLetters/>
  <TypingText />
  <ButtonPrimary :button-text="'Lag en nettside'" @click="showModal"/>
  <ButtonPrimary :button-text="'Jeg prøver lykken'" :to="'/about'"/>
  <ContactFormModal v-model="isModalVisible"/>
</template>
