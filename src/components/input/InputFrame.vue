<script setup lang="ts">
import { computed } from 'vue';

interface InputFrameProps {
  max: number;
  inputTotal?: number;
  disabled?: boolean;
  inputType?: string;
}

const props = withDefaults(defineProps<InputFrameProps>(), {
  inputTotal: 0
});

const classList = computed(() => {
  const list = []
  if (props.inputType === 'textarea' || props.inputType === 'json') {
    list.push('tw-border-b', 'tw-self-start', 'tw-rounded-bl-lg', 'tw-rounded-tr-lg')
  } else {
    list.push('tw-rounded-r')
  }
  return list
})

const emit = defineEmits(['removeComponent']);
</script>
<template>
  <div class="input-frame tw-flex tw-flex-grow tw-relative">
    <slot/>
    <button
      type="button"
      v-if="(disabled && max === Infinity) || max > 1"
      :class="['tw-btn-remove', 'tw-absolute', 'tw-inset-y-[1px]', 'tw-right-[1px]', 'tw-border-l', classList]"
      @click.prevent="emit('removeComponent')"
      :disabled="inputTotal <= 1"
    >
      <i class="far fa-trash"></i>
    </button>
  </div>
</template>
