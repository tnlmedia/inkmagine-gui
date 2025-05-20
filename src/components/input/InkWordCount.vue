<script setup lang="ts">
import { t } from '@/helper/i18n';
const props = defineProps<{
  maxLength: number;
  wordCount: number;
}>();

</script>
<template>
<span class="tw-text-right tw-text-xs tw-text-gray tw-w-full">
  {{ wordCount }} / {{ maxLength }}
  {{ t('words') }}
</span>
</template>
