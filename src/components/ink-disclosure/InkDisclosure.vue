<script setup lang="ts">
import { computed } from 'vue'
import { Disclosure } from '@headlessui/vue'
import { useRestAttrs } from '@/helper/useAttrs'
const restAttrs = useRestAttrs()
</script>
<template>
    <Disclosure
    v-bind="restAttrs"
    v-slot="slotProps"
    >
        <slot v-bind="slotProps" />
    </Disclosure>
</template>