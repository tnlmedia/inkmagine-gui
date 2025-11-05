<script setup lang="ts">
import '@/scss/component/_ink-spinner.scss'
import { computed } from 'vue'
import { useRestAttrs } from '@/helper/useAttrs'

interface InkSpinnerProps {
  size?: 'md'
  theme?: 'primary' | 'gray'
}
const props = withDefaults(defineProps<InkSpinnerProps>(), {
  theme: 'primary'
})
const restAttrs = useRestAttrs()
const classList = computed(() => {
  const list = []
  if(props.size) list.push(`tw-spinner-${props.size}`)
  if(props.theme) list.push(`tw-spinner-grow-${props.theme}`)
  return list
})
</script>
<template>
  <div 
  v-bind="restAttrs"
  :class="['tw-spinner-grow',classList]"
  ></div>
</template>