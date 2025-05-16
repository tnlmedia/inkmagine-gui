<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, watch, type PropType } from "vue";
import type { UrlSharp } from '@/components/input/field-data-interface';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { fieldDefaultValue, checkFieldMax } from '@/components/input/input-default-value';
const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  required: {
    type: Boolean,
    default:false
  },
  disabled: {
    type: Boolean,
    default:false
  },
  inputTotal: {
    type: Number,
    default: 0
  },
  field: {
    type: Object as PropType<UrlSharp>,
    required: true,
    default: () => (fieldDefaultValue('url'))
  }
});
const emit = defineEmits(['removeInputItemFn']);
const rules = computed(() => ({
  required: props.required,
  url: true,
}));

const { value, errorMessage } = useField(`${props.field.id}[${props.index}]`, rules);
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
        type="url"
        :class="['form-control tw-input-txt tw-w-full', { 'tw-border-danger-400': errorMessage }]"
        v-model.trim="value"
        :disabled="disabled"
        :required="required"
        :placeholder="field.placeholder"
        @keydown.enter.prevent
        />
      </InputFrame>
      <!-- InputInner for other input type suffix in here -->
    </InputInner>
    <!-- error message -->
    <InkErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
  </InputWrapper>
</template>
