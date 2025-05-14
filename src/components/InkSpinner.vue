<script setup lang="ts">
import '@/scss/component/_ink-spinner.scss'
import { computed } from 'vue'
import { restAttrs } from '@/helper/attrs'

interface InkSpinnerProps {
  size?: 'md'
  theme?: 'gray'
}
const props = withDefaults(defineProps<InkSpinnerProps>(), {
  theme: 'gray'
})
const computedRestAttrs = computed(restAttrs)
const classList = computed(() => {
  const list = []
  if(props.size) list.push(`tw-spinner-${props.size}`)
  if(props.theme) list.push(`tw-spinner-grow-${props.theme}`)
  return list
})
</script>
<template>
  <div 
  v-bind="computedRestAttrs"
  :class="['tw-spinner-grow',classList]"
  ></div>
</template>