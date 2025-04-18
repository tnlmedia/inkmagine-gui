<script setup lang="ts">
import { restAttrs } from '@/helper/attrs'
import { MenuItem } from '@headlessui/vue'
interface MenuItemProps {
  as?: string,
}
const props = withDefaults(defineProps<MenuItemProps>(), {
  as: 'template',
})
</script>
<template>
    <MenuItem
    v-bind="restAttrs"
    v-slot="slotProps"
    class="menu-item-link"
    :as="as"
    >
     <slot v-bind="slotProps" />
    </MenuItem>
</template>