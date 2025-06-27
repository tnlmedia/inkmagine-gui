<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, type PropType, toRef } from 'vue';
import { defaultInputProps, useMergeFieldProps } from '@/components/input/input-default-value';
import type { SwitchSharp } from '@/components/input/field-data-interface';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';

const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<SwitchSharp>,
    required: true,
  },
});

const emit = defineEmits(['removeInputItemFn', 'inkChanged']);

const {mergeField, checkFieldMax} = useMergeFieldProps<SwitchSharp>('switch', toRef(props, 'field'));

const onChange = () => {
  handleChange(!value.value);
  emit('inkChanged', value.value);
};
const rules = computed(() => ({
  required: props.required,
}));

const { value, errorMessage, handleChange } = useField<boolean>(`${mergeField.value.id}[${props.valueIndex}]`, rules);

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
      <button
        type="button"
        :class="[
          'tw-switch',
          value ? 'tw-bg-secondary-800' : 'tw-bg-gray-400',
        ]"
        :disabled="disabled"
        @click="onChange()"
      >
        <input
          type="checkbox"
          :checked="value"
          :disabled="disabled"
          readonly
          hidden
        />
        <span class="tw-sr-only">Enable notifications</span>
        <span
          :class="value ? 'tw-translate-x-4' : 'tw-translate-x-0'"
          class="tw-inline-block tw-h-3 tw-w-3 tw-transform tw-rounded-full tw-bg-white tw-transition"
        />
      </button>
    </InputFrame>
    </InputInner>
    <InkErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
  </InputWrapper>
</template>
