<script setup lang="ts">
import { useRestAttrs } from '@/helper/useAttrs'
const restAttrs = useRestAttrs()
</script>
<template>
    <div
    v-bind="restAttrs"
    class="menu-items-wrapper"
    >
      <slot />
    </div>
</template>
