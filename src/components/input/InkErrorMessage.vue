<script setup lang="ts">
const props = defineProps({
  errorText: {
    type: String,
    default: ''
  }
});
</script>
<template>
  <em :class="'tw-error-message tw-block'">{{ props.errorText }}</em>
</template>
