<script setup lang="ts">
import { restAttrs } from '@/helper/attrs'
import { MenuItem } from '@headlessui/vue'
import { computed } from 'vue'
interface MenuItemProps {
  as?: string,
}
const props = withDefaults(defineProps<MenuItemProps>(), {
  as: 'template',
})
const computedRestAttrs = computed(restAttrs)
</script>
<template>
    <MenuItem
    v-bind="computedRestAttrs"
    v-slot="slotProps"
    class="menu-item-link"
    :as="as"
    >
     <slot v-bind="slotProps" />
    </MenuItem>
</template>