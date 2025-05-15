<script setup lang="ts">
import type { FieldDataSharp } from './field-data-interface';

interface InputFrameProps {
  max: number;
  inputTotal?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<InputFrameProps>(), {
  inputTotal: 0
});

const emit = defineEmits(['removeComponent']);
</script>
<template>
  <div class="input-frame tw-flex tw-flex-grow tw-relative">
    <slot/>
    <button
      type="button"
      v-if="(disabled && max === Infinity) || max > 1"
      class="tw-btn-remove tw-absolute tw-inset-y-[1px] tw-right-[1px] tw-rounded-r tw-border-l "
      @click.prevent="emit('removeComponent')"
      :disabled="inputTotal <= 1"
    >
      <i class="far fa-trash"></i>
    </button>
  </div>
</template>
