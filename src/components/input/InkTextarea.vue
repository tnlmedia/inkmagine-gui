<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, type PropType } from "vue";
import type { TextareaSharp } from '@/components/input/field-data-interface';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import InkWordCount from '@/components/input/InkWordCount.vue';
import { defaultInputProps, useMergeFieldProps } from '@/components/input/input-default-value';

const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<TextareaSharp>,
    required: true,
  }
});

const {mergeField, minLength, maxLength, checkFieldMax} = useMergeFieldProps<TextareaSharp>('textarea', props.field);

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
      <InputFrame 
      :max="checkFieldMax" 
      :disabled="disabled" 
      :inputTotal="inputTotal"
      @removeComponent="emit('removeInputItemFn', valueIndex)"
      >
      <div :class="['tw-textarea tw-w-full', { 'tw-border-danger-400': errorMessage }]">
      <textarea
      rows="5"
      :minlength="minLength"
      :maxlength="maxLength"
      :class="['form-control tw-w-full']"
      v-model.trim="value"
      :disabled="disabled"
      :required="required"
      :placeholder="mergeField.placeholder"
       @keydown.enter.prevent
      />
      </div>
      </InputFrame>
    </InputInner>
    <InkWordCount v-if="maxLength" :maxLength="maxLength" :wordCount="value.length" />
    <InkErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
  </InputWrapper>
</template>
