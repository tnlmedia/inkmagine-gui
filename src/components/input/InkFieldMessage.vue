<script setup lang="ts">
const props = defineProps({
  descriptionText: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <em :class="'tw-field-message tw-block'" v-html="props.descriptionText"></em>
</template>