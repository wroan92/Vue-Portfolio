<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ButtonPrimary',
  props: {
    buttonText: String,
    to: String,
  },
  setup(props) {
    const router = useRouter();

    function handleClick() {
      if (props.to) {
        console.log('Navigating to:', props.to);
        router.push(props.to);
      }
    }

    return { handleClick };
  },
});
</script>

<template>
  <button @click="handleClick">
    {{ buttonText }}
  </button>
</template>

<style scoped>
button {
  margin: 20px 10px;
  padding: 10px 24px;
  font-size: 0.875rem; 
  font-family: 'Roboto', sans-serif;
  color: #5f6368; 
  background-color: #f8f9fa; 
  border: 1px solid #f8f9fa;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.2s, border 0.2s;
}

button:hover {
  background-color: #f0f0f1; /* Lighter background on hover */
  border: 1px solid #c2c2c2; /* Slightly darker border on hover */
}

button:active {
  background-color: #e8eaed; /* Even lighter background for active state */
  box-shadow: none; /* Remove shadow in active state */
}
</style>
