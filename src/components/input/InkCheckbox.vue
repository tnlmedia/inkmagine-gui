<script setup lang="ts">
import { ref, computed, type PropType, watch, toRef, useId } from "vue";
import { useField } from 'vee-validate';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { defaultInputProps, useMergeFieldProps, useMergeCheckBoxInputBind } from '@/components/input/input-default-value';
import { useIntersectionObserver } from '@vueuse/core';
import type { CheckBoxSharp, CheckBoxInputBind, UnKnownOptions} from '@/components/input/field-data-interface';
// import InkCheckBoxInput from '@/components/input/InkCheckBoxInput.vue';
import { t } from '@/helper/i18n';

const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<CheckBoxSharp>,
    required: true,
  },
  inputBind: {
    type: Object as PropType<CheckBoxInputBind>,
    default: () => ({}),
  },
});
const emit = defineEmits(['removeInputItemFn']);

const {mergeField, checkFieldMax} = useMergeFieldProps<CheckBoxSharp>('checkbox', toRef(props, 'field'));
const { mergeInputBind, clearInputBind } = useMergeCheckBoxInputBind(toRef(props, 'inputBind'));

const checkedValueKey = computed(() => {
  const key = mergeInputBind.value.valueKey || 'key'
  if(!mergeInputBind.value.options?.[0]?.hasOwnProperty(key)){
    console.warn(`InkCheckbox - the key "${key}" is not in the options, please check the options and the inputBind.valueKey. inputBind.valueKey default is "key"`);
  }
  return key;
});
const onChange = (id: number | string, event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked;
  // let newValue = isChecked ? [...value.value, id] : value.value.filter(item => item !== id);
  let newValue;
  if(isChecked){
    // newValue = [...value.value, id];
    newValue = value.value.filter(item => item !== undefined).concat(id);
  }else{
    newValue = value.value.filter(item => {
      if(typeof item === 'object' && item !== null){
        return item[checkedValueKey.value] !== id && item !== undefined;
      }else{
        return item !== id && item !== undefined;
      }
    });
  }
  if(newValue.length === 0){
    newValue = [undefined];
  }
  // emit('update:modelValue', newValue);
  handleChange(newValue);
};
const isChecked = (id: number | string) => {
  return value.value.some(item => {
    if(typeof item === 'object' && item !== null){
      return item[checkedValueKey.value] === id;
    }else{
      return item === id;
    }
  });
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
const { value, errorMessage, handleChange } = useField<number[] | string[] | UnKnownOptions[]>(mergeField.value.id, rules);

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
      <div class="form-checks">
        <div 
        v-for="option in mergeInputBind.options" 
        :key="useId()" 
        :class="['form-check', { 'form-check-depth': option.depth}]"
        :style="{ 'margin-left': option.depth + 'em' }"
        >
          <label
            :class="[
                'form-check-label',
                {
                    'form-check-label-disabled': disabled || option.disabled,
                    'tw-text-danger-400': errorMessage,
                },
            ]">
            <!-- <InkCheckBoxInput
              :name="mergeField.id"
              :value="option[checkedValueKey] as string | number | undefined"
              :required="required"
              :disabled="disabled || option.disabled"
              v-on="inputOn"
            >{{ option[mergeInputBind.label || 'name'] }}</InkCheckBoxInput> -->
              <input 
              v-model="value"
              type="checkbox" 
              class="form-check-input tw-peer"
              :value="option[checkedValueKey] as string | number" 
              :disabled="disabled || option.disabled"
              v-bind="clearInputBind"
              v-on="inputOn"
              />
            <span class="form-label-text">{{ option[mergeInputBind.label || 'name'] }}</span>
            <i :class="['tw-check', { 'tw-border-danger-400': errorMessage }]"></i>
          </label>
        </div>
      </div>
      </InputFrame>
    </InputInner>
    <InkErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
  </InputWrapper>
  <div v-show="mergeInputBind.hasNextPage" ref="load" class="tw-text-sm tw-text-gray-600 tw-italic">{{ t('loading') }}</div>
</template>
