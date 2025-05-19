<script setup lang="ts">
import { useField } from 'vee-validate';
import { ref, computed, watch, type PropType } from "vue";
import type { TextSharp } from '@/components/input/field-data-interface';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { defaultInputProps, fieldDefaultValue, checkFieldMax } from '@/components/input/input-default-value';

const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<TextSharp>,
    required: true,
    default: () => (fieldDefaultValue('text'))
  }
});
const rules = computed(() => ({
  required: props.field.require,
  wordLimit: props.field.limit,
}));

const { value, errorMessage } = useField(`${props.field.id}[${props.index}]`, rules);

const emit = defineEmits(['removeInputItemFn']);

const minLength = computed(() => {
  return Array.isArray(props.field.limit) && typeof props.field.limit[0] === 'number' ? props.field.limit[0] : undefined;
});
const maxLength = computed(() => {
  return Array.isArray(props.field.limit) && typeof props.field.limit[1] === 'number' ? props.field.limit[1] : undefined;
});
</script>
<template>
  <InputWrapper>
    <!--  InputWrapper for group error message, other input type wordcount, etc. -->
    <InputInner>
      <!-- InputInner for other input type prefix in here -->
      <InputFrame 
      :max="checkFieldMax(field.max)" 
      :disabled="disabled" 
      :inputTotal="inputTotal"
      @removeComponent="emit('removeInputItemFn', index)"
      >
      <input
      type="text"
      :minlength="minLength"
      :maxlength="maxLength"
      :class="['form-control tw-input-txt tw-w-full', { 'tw-border-danger-400': errorMessage }]"
      v-model.trim="value"
      :disabled="disabled"
      :required="required"
      :placeholder="field.placeholder"
       @keydown.enter.prevent
      />
      </InputFrame>
    </InputInner>
    <InkErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
  </InputWrapper>
</template>
