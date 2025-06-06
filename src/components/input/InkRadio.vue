<script setup lang="ts">
import { ref, computed, type PropType, watch, toRef, useId } from "vue";
import { useField } from 'vee-validate';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { defaultInputProps, useMergeFieldProps, useMergeCheckBoxInputBind } from '@/components/input/input-default-value';
import { useIntersectionObserver } from '@vueuse/core';
import type { RadioSharp, RadioInputBind, UnKnownOptions} from '@/components/input/field-data-interface';

import { t } from '@/helper/i18n';

const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<RadioSharp>,
    required: true,
  },
  inputBind: {
    type: Object as PropType<RadioInputBind>,
    default: () => ({}),
  },
});
const emit = defineEmits(['removeInputItemFn']);

const {mergeField, checkFieldMax} = useMergeFieldProps<RadioSharp>('radio', toRef(props, 'field'));
 // because radio current is similar to checkbox, so use the same function to merge inputBind,
 // but if radio is not similar to checkbox, please use the different function to merge inputBind
const { mergeInputBind, clearInputBind } = useMergeCheckBoxInputBind(toRef(props, 'inputBind'));

const checkedValueKey = computed(() => {
  const key = mergeInputBind.value.valueKey || 'key'
  if(!mergeInputBind.value.options?.[0]?.hasOwnProperty(key)){
    console.warn(`InkRadio - the key "${key}" is not in the options, please check the options and the inputBind.valueKey. inputBind.valueKey default is "key"`);
  }
  return key;
});
const onChange = (id: number | string, event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked;
  // let newValue = isChecked ? [...value.value, id] : value.value.filter(item => item !== id);
  let newValue = undefined;
  if(isChecked){
    newValue = id;
  }

  handleChange(newValue);
};
const isChecked = (id: number | string) => {
    if(typeof value.value === 'object' && value.value !== null){
      return value.value[checkedValueKey.value] === id;
    }else{
      return value.value === id;
    }
}

// get infinite data start
const root = ref(null)
const load = ref(null)

const IntersectionObserver = useIntersectionObserver(
  load,
  ([entry]) => {
    if (!entry.isIntersecting) return;
    // emit('infiniteHandler');
    if(mergeInputBind.value.infiniteFn){
      mergeInputBind.value.infiniteFn();
    }
  },
  { root },
)
watch(() => mergeInputBind.value.hasNextPage, (newValue) => {
  // console.log('IntersectionObserver',IntersectionObserver)
  if (newValue) {
    IntersectionObserver.resume();
  } else {
    IntersectionObserver.pause();
  }
}, { immediate: true })
// get infinite data end
const rules = computed(() => ({
  required: props.required,
}));
const { value, errorMessage, handleChange } = useField<number | string | UnKnownOptions>(`${mergeField.value.id}[${props.valueIndex}]`, rules);

</script>

<template>
  <InputWrapper>
    <InputInner>
      <InputFrame
      :inputType="mergeField.type"
      :max="checkFieldMax" 
      :disabled="disabled"
      :inputTotal="inputTotal"
      @removeComponent="emit('removeInputItemFn', valueIndex)"
      >
        <div 
        class="form-radio tw-mt-0 tw-flex tw-flex-col tw-gap-2"
        >
          <label
            v-for="option in mergeInputBind.options" 
            :key="useId()" 
            :class="[
                'form-radio-label',
                {
                    'form-check-label-disabled': disabled || option.disabled,
                    'tw-text-danger-400': errorMessage,
                },
            ]">
              <input 
              v-model="value"
              type="radio" 
              class="form-check-input tw-peer"
              :value="option[checkedValueKey] as string | number" 
              :disabled="disabled || option.disabled"
              v-bind="clearInputBind"
              v-on="inputOn"
              />
            {{ option[mergeInputBind.label || 'name'] }}
            <i :class="['tw-radio', { 'tw-border-danger-400': errorMessage }]"></i>
          </label>
        </div>
      </InputFrame>
    </InputInner>
    <InkErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
  </InputWrapper>
  <div v-show="mergeInputBind.hasNextPage" ref="load" class="tw-text-sm tw-text-gray-600 tw-italic">{{ t('loading') }}</div>
</template>
