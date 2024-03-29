<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <form @submit.prevent="sendEmail" class="contact-form">
        <div class="form-group">
          <input type="text" id="name" placeholder=" " required autocomplete="off" v-model="name">
          <label for="name" class="form-label">Navn</label>
        </div>
        <div class="form-group">
          <input type="email" id="email" placeholder=" " required autocomplete="off" v-model="email">
          <label for="email" class="form-label">E-post</label>
        </div>
        <div class="form-group">
          <textarea id="message" placeholder=" " rows="4" v-model="message"></textarea>
          <label for="message" class="form-label">Melding</label>
        </div>
        <button type="submit" class="submit-button">Send</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification';
import { ref } from 'vue';

const toast = useToast();
defineProps({
  modelValue: Boolean
});
const emit = defineEmits(['update:modelValue']);


const name = ref('');
const email = ref('');
const message = ref('');

async function sendEmail() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(`Full URL being used for request: ${backendUrl}/send-email`);
  try {
    const response = await fetch(`${backendUrl}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });

    if (response.ok) { 
      closeModal(); 
      toast.success('Takk for din henvendelse!');
      name.value = '';
      email.value = '';
      message.value = '';
    } else {
      toast.error('Beklager, det oppstod en feil ved sending av e-post');
      throw new Error('Feil ved sending av e-post');
    }
  } catch (error) {
    console.error(error);
  }
}

function closeModal() {
  emit('update:modelValue', false);
}
</script>
