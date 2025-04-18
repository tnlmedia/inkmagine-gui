<script setup lang="ts">
import { type Component } from 'vue'
import { MenuButton } from '@headlessui/vue'
import { restAttrs } from '@/helper/attrs'

interface MenuButtonProps { 
  as?: string | Component,
}
const props = withDefaults(defineProps<MenuButtonProps>(), {
  as: 'template'
})
</script>
<template>
  <MenuButton
  v-bind="restAttrs"
  :as="as"
  v-slot="slotProps"
  >
    <slot v-bind="slotProps" />
  </MenuButton>
</template>