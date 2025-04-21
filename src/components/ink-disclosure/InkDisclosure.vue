<script setup lang="ts">
import { Disclosure } from '@headlessui/vue'
import { restAttrs } from '@/helper/attrs'
</script>
<template>
    <Disclosure
    v-bind="restAttrs"
    v-slot="slotProps"
    >
        <slot v-bind="slotProps" />
    </Disclosure>
</template>