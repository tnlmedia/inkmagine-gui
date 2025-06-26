<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, type PropType, toRef } from "vue";
import type { TextSharp } from '@/components/input/field-data-interface';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { defaultInputProps, useMergeFieldProps } from '@/components/input/input-default-value';

const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<TextSharp>,
    required: true,
  },
  inputBind: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },
});

const {mergeField, minLength, maxLength, checkFieldMax} = useMergeFieldProps<TextSharp>('text', toRef(props, 'field'));

const rules = computed(() => ({
  required: props.required,
  wordLimit: mergeField.value.limit,
}));

const { value, errorMessage } = useField<string>(`${mergeField.value.id}[${props.valueIndex}]`, rules);

const emit = defineEmits(['removeInputItemFn']);

</script>
<template>
  <InputWrapper>
    <!--  InputWrapper for group error message, other input type wordcount, etc. -->
    <InputInner>
      <!-- InputInner for other input type prefix in here -->
      {{ mergeField.prefix }}
      <InputFrame 
      :max="checkFieldMax" 
      :disabled="disabled" 
      :inputTotal="inputTotal"
      @removeComponent="emit('removeInputItemFn', valueIndex)"
      >
      <input
      type="text"
      :minlength="minLength"
      :maxlength="maxLength"
      :class="['form-control tw-input-txt tw-w-full', { 'tw-border-danger-400': errorMessage }]"
      v-model.trim="value"
      :disabled="disabled"
      :required="required"
      :placeholder="mergeField.placeholder"
      v-bind="inputBind"
      v-on="inputOn"
      @keydown.enter.prevent
      />
      </InputFrame>
      {{ mergeField.suffix }}
    </InputInner>
    <InkErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
  </InputWrapper>
</template>
