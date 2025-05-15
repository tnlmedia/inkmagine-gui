<script setup lang="ts">
import { useField } from 'vee-validate';
import { ref, computed, watch, type PropType } from "vue";
import type { TextSharp } from '@/components/input/field-data-interface';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';

const props = defineProps({
  required: {
    type: Boolean,
    default:false
  },
  disabled: {
    type: Boolean,
    default:false
  },
  // placeholder: {
  //   type: String,
  //   default: ''
  // },
  modelValue: {
    type: String,
    default: ''
  },
  // fieldId: {
  //   type: String,
  //   default: ''
  // },
  field: {
    type: Object as PropType<TextSharp>,
    default: () => ({})
  }
});
const emit = defineEmits(['update:modelValue']);
const rules = computed(() => ({
  required: props.field.require,
}));
const { value, errorMessage } = useField(props.field.id, rules, {
  initialValue:props.modelValue,
});
watch(() => props.modelValue, (newVal, oldVal) => {
  // set old value to value
  if (newVal !== oldVal && newVal !== undefined) {
    value.value = newVal;
  }
})
</script>
<template>
  <InputWrapper>
    <InputInner>
      <input
      type="text"
      :class="['form-control tw-input-txt tw-w-full', { 'tw-border-danger-400': errorMessage }]"
      v-model.trim="value"
      :disabled="disabled"
      :required="required"
      :placeholder="field.placeholder"
      @input="emit('update:modelValue', value)"
      />
    </InputInner>
    <InkErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
  </InputWrapper>
</template>
