<template>
    <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <form @submit.prevent="sendEmail" class="contact-form">
          <div class="form-group">
            <input type="text" id="name" required autocomplete="off">
            <label for="name" class="form-label">Navn</label>
          </div>
          <div class="form-group">
            <input type="email" id="email" required autocomplete="off">
            <label for="email" class="form-label">E-post</label>
          </div>
          <div class="form-group">
            <textarea id="message" rows="4" required></textarea>
            <label for="message" class="form-label">Melding</label>
          </div>
          <button type="submit" class="submit-button">Send</button>
        </form>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    modelValue: Boolean
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  function closeModal() {
    emit('update:modelValue', false);
  }
  
  function sendEmail() {
    // Logikk for å sende e-post her.
    closeModal();
  }
  </script>