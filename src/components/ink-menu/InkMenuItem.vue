<script setup lang="ts">
import { useRestAttrs } from '@/helper/useAttrs'
import { MenuItem } from '@headlessui/vue'
interface MenuItemProps {
  as?: string,
}
const props = withDefaults(defineProps<MenuItemProps>(), {
  as: 'template',
})
const restAttrs = useRestAttrs()
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