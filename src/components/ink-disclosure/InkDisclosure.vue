<script setup lang="ts">
import { computed } from 'vue'
import { Disclosure } from '@headlessui/vue'
import { restAttrs } from '@/helper/attrs'
const computedRestAttrs = computed(restAttrs)
</script>
<template>
    <Disclosure
    v-bind="computedRestAttrs"
    v-slot="slotProps"
    >
        <slot v-bind="slotProps" />
    </Disclosure>
</template>