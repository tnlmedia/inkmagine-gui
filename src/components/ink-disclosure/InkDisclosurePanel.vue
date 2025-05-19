<script setup lang="ts">
import { DisclosurePanel } from '@headlessui/vue'
import { useRestAttrs } from '@/helper/useAttrs'
const restAttrs = useRestAttrs()
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