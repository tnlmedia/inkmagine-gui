<script setup lang="ts">
interface SidebarSimpleHideProps {
  as?: string
}
const props = withDefaults(defineProps<SidebarSimpleHideProps>(), {
  as: 'span'
})
</script>

<template>
  <component
    :is="as"
    class="nav-simple-hide"
  >
    <slot />
  </component>
</template>
