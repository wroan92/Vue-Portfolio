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
  <button class="button-primary" @click="handleClick">
    {{ buttonText }}
  </button>
</template>

