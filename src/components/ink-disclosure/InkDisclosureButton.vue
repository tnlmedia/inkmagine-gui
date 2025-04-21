<script setup lang="ts">
import '@/scss/component/_ink-disclosure.scss'
import { DisclosureButton } from '@headlessui/vue'
import { restAttrs } from '@/helper/attrs'

interface DisclosureButtonProps {
  as?: string,
  type?: string,
}
const props = withDefaults(defineProps<DisclosureButtonProps>(), {
  as: 'button',
  type: 'button',
})
</script>
<template>
    <DisclosureButton
    :type=" as === 'button' ? type : undefined"
    v-bind="restAttrs"
    v-slot="slotProps"
    class="tw-disclosure-button tw-disclosure-button-gray"
    :as="as"
    >
        <slot v-bind="slotProps" />
        <i
          :class="[
            'far fa-angle-down tw-text-base tw-text-gray-700',
            { 'tw-rotate-180': slotProps.open },
          ]"
        ></i>
    </DisclosureButton>
</template>