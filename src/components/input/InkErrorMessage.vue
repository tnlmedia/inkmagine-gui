<script setup lang="ts">
const props = defineProps({
  errorText: {
    type: String,
    default: ''
  }
});
</script>
<template>
  <em :class="'tw-error-message tw-block tw-w-full tw-break-all'">{{ props.errorText }}</em>
</template>
