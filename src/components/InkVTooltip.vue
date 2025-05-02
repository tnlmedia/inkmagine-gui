<script setup lang="ts">
import 'floating-vue/dist/style.css'
import { Tooltip } from 'floating-vue'
import { options } from 'floating-vue'

options.themes.tooltip.placement = 'bottom'
options.themes.tooltip.triggers = ['hover', 'focus', 'click']

</script>

<template>
  <Tooltip>
    <slot />
    <template #popper>
      <slot name="popper" />
    </template>
  </Tooltip>
</template>