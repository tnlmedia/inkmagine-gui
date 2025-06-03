<script setup lang="ts">
import '@/scss/component/_ink-badge.scss'
import { computed } from 'vue'
import { useRestAttrs } from '@/helper/useAttrs'

interface ButtonProps { 
  as?: 'span' | 'button',
  type?: 'button',
  theme?: 'info',
  disabled?: boolean,
}
const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'span',
  theme: 'info',
  disabled: false,
})
const restAttrs = useRestAttrs()
const classList = computed(() => {
  const list = []
  list.push(`tw-badge tw-badge-${props.theme}`)
  if (props.as !== 'button' && props.disabled) list.push('tw-disabled')

  return list
})
</script>
<template>
    <component 
    v-bind="restAttrs"
    :is="as"
    :type="as === 'button' ? type : undefined"
    :disabled="disabled"
    :class="classList"
    >
      <slot>badge</slot>
    </component>
</template>