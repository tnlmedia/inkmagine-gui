<script setup lang="ts">
import '@/scss/component/_ink-menu.scss'
import { type Component } from 'vue'
import { Menu } from '@headlessui/vue'
import { useRestAttrs } from '@/helper/useAttrs'

interface MenuProps { 
  as?: string | Component,
}
const props = withDefaults(defineProps<MenuProps>(), {
  as: 'div'
})
const restAttrs = useRestAttrs()
</script>
<template>
  <Menu 
  v-bind="restAttrs"
  :as="as"
  v-slot="slotProps"
  class="tw-menu"
  >
    <slot v-bind="slotProps" />
  </Menu>
</template>

