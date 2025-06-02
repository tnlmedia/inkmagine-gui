<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import type { Language } from 'element-plus/es/locale'
import { ref, watchEffect } from 'vue';
import { inkI18n } from '@/helper/i18n';
import { useRestAttrs } from '@/helper/useAttrs'

const restAttrs = useRestAttrs()

const locale = ref<Language>();

watchEffect(async () => {
  switch (inkI18n.global.locale.value) {
    case 'zh-tw':
      locale.value = (await import('element-plus/es/locale/lang/zh-tw')).default
      break
    case 'en-us':
      locale.value = (await import('element-plus/es/locale/lang/en')).default
      break
    case 'ja-jp':
      locale.value = (await import('element-plus/es/locale/lang/ja')).default
      break
    default:
      locale.value = (await import('element-plus/es/locale/lang/en')).default
  }
})
</script>

<template>
  <ElConfigProvider 
  :locale="locale"
  v-bind="restAttrs"
  >
    <slot />
  </ElConfigProvider>
</template>