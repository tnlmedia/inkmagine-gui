<script setup lang="ts">
import { DisclosurePanel } from '@headlessui/vue'
import { restAttrs } from '@/helper/attrs'
import { computed } from 'vue'
const computedRestAttrs = computed(restAttrs)
</script>
<template>
    <DisclosurePanel
    v-bind="computedRestAttrs"
    v-slot="slotProps"
    class="tw-disclosure-panel"
    >
        <slot v-bind="slotProps" />
    </DisclosurePanel>
</template>