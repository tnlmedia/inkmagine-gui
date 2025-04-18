<script setup lang="ts">
import { restAttrs } from '@/helper/attrs'
</script>
<template>
    <div
    v-bind="restAttrs"
    class="menu-items-wrapper"
    >
      <slot />
    </div>
</template>
