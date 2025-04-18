<script setup lang="ts">
import '@/scss/component/_ink-button.scss'
import { computed } from 'vue'
import InkSpinner from '@/components/InkSpinner.vue'
import { restAttrs } from '@/helper/attrs'

interface ButtonProps { 
  as?: 'a' | 'button' | 'router-link',
  type?: 'button' | 'submit' | 'reset',
  size?: 'md'| 'xs',
  variant?: 'base' | 'txt' | 'icon',
  theme?: 'primary' | 'info' | 'gray' | 'outline-gray' | 'link' | 'transparent',
  disabled?: boolean,
  loading?: boolean
}
const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  type: 'button',
  variant: 'base',
  theme: 'transparent',
  disabled: false,
  loading: false
})

const classList = computed(() => {
  const list = []
  switch (props.variant) { 
    case 'icon':
      props.size ? list.push(`tw-btn-icon-${props.size}`) : list.push(`tw-btn-icon`);
      break;
    default:
      if(props.variant) list.push(`tw-btn-${props.variant}`)
      if (props.size) list.push(`tw-btn-${props.size}`);
      break;
  }
  if (props.loading) {
    props.variant === 'base' ? '' : list.push(`tw-btn-outline-gray`)
  } else {
    props.theme ? list.push(`tw-btn-${props.theme}`) : list.push(`tw-btn-transparent`) 
  }
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
      <InkSpinner size="md" v-if="loading" />
      <slot v-else>Button</slot>
    </component>
</template>