<script setup lang="ts">
import '@/scss/component/_ink-menu.scss'
import { type Component } from 'vue'
import { Menu } from '@headlessui/vue'
import { restAttrs } from '@/helper/attrs'
import { computed } from 'vue'

interface MenuProps { 
  as?: string | Component,
}
const props = withDefaults(defineProps<MenuProps>(), {
  as: 'div'
})
const computedRestAttrs = computed(restAttrs)
</script>
<template>
  <Menu 
  v-bind="computedRestAttrs"
  :as="as"
  v-slot="slotProps"
  class="tw-menu"
  >
    <slot v-bind="slotProps" />
  </Menu>
</template>

