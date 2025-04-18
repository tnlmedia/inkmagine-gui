<script setup lang="ts">
import { MenuItems } from '@headlessui/vue'
import { restAttrs } from '@/helper/attrs'
</script>
<template>
  <MenuItems 
  v-bind="restAttrs"
  v-slot="slotProps"
  class="tw-menu-items"
  >
    <slot v-bind="slotProps" />
  </MenuItems>
</template>

