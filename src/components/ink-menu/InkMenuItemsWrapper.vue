<script setup lang="ts">
import { restAttrs } from '@/helper/attrs'
import { computed } from 'vue'
const computedRestAttrs = computed(restAttrs)
</script>
<template>
    <div
    v-bind="computedRestAttrs"
    class="menu-items-wrapper"
    >
      <slot />
    </div>
</template>
