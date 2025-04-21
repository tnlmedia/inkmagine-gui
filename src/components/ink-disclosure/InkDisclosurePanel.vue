<script setup lang="ts">
import { DisclosurePanel } from '@headlessui/vue'
import { restAttrs } from '@/helper/attrs'
</script>
<template>
    <DisclosurePanel
    v-bind="restAttrs"
    v-slot="slotProps"
    class="tw-disclosure-panel"
    >
        <slot v-bind="slotProps" />
    </DisclosurePanel>
</template>