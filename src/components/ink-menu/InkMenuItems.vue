<script setup lang="ts">
import { MenuItems } from '@headlessui/vue'
import { computed } from 'vue'
import { restAttrs } from '@/helper/attrs'
const computedRestAttrs = computed(restAttrs)
</script>
<template>
  <MenuItems 
  v-bind="computedRestAttrs"
  v-slot="slotProps"
  class="tw-menu-items"
  >
    <slot v-bind="slotProps" />
  </MenuItems>
</template>

