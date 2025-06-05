<script setup lang="ts">
import '@/scss/component/_ink-element-plus-datetime.scss';
import { ElDatePicker } from 'element-plus';
import 'element-plus/es/components/date-picker/style/css';
import { computed, onMounted, PropType, useTemplateRef, toRef, ref, watch } from "vue";
import { useField } from "vee-validate";
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { defaultInputProps, useMergeFieldProps, useMergeDatetimerngInputBind } from '@/components/input/input-default-value';
import type { DatetimerngSharp, DatetimerngInputBind } from '@/components/input/field-data-interface';
import { formatTimeToUnix, convertUnixToStartOf } from '@/helper/dayjs';
import { t } from '@/helper/i18n';

const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<DatetimerngSharp>,
    required: true,
  },
  inputBind: {
    type: Object as PropType<DatetimerngInputBind>,
    default: () => ({}),
  },
});
const emit = defineEmits(['removeInputItemFn']);
const { mergeField, checkFieldMax,minLength, maxLength } = useMergeFieldProps<DatetimerngSharp>(props.field.type, toRef(props, 'field'));
const { mergeInputBind, clearInputBind, panelInputModeNone, panelTimezone } = useMergeDatetimerngInputBind(toRef(props, 'inputBind'));

const rngElType = computed(() => {
  if(mergeInputBind.value.type) return mergeInputBind.value.type;
  switch(mergeField.value.type){
    case 'daterng':
    return 'date'
    default:
    return 'datetime'
  }
});
const rngElFormat = computed(() => {
  if(mergeInputBind.value.format) return mergeInputBind.value.format;
  switch(mergeField.value.type){
    case 'daterng':
    return 'YYYY/MM/DD'
    default:
    return 'YYYY/MM/DD HH:mm'
  }
});
const clearTime = () => {
  handleChangeStart(undefined);
  handleChangeEnd(undefined);
};
const startDisabledDate = (date: Date) => {
  if(minLength.value && formatTimeToUnix(date) < minLength.value){
    return true;
  }
  if(maxLength.value && formatTimeToUnix(date) > maxLength.value){
    return true;
  }
  if(endValue.value && formatTimeToUnix(date) > endValue.value ){
    return true
  }
  return false;
}
const endDisabledDate = (date: Date) => {
  if(minLength.value && formatTimeToUnix(date) < minLength.value){
    return true;
  }
  if(maxLength.value && formatTimeToUnix(date) > maxLength.value){
    return true;
  }
  if(startValue.value && formatTimeToUnix(date) < convertUnixToStartOf(startValue.value)){
    return true;
  }
  return false;
}
const startDatePickerRef = useTemplateRef('startDatePicker');
const endDatePickerRef = useTemplateRef('endDatePicker');

const elStyle = computed(() => {
  return {
    'tw-border-danger-400': startErrorMessage.value || endErrorMessage.value,
    'tw-border-secondary-700': mergeInputBind.value.activeStyle && startValue.value && endValue.value,
    'tw-disabled': props.disabled,
  };
});

onMounted(() => {
  const datePickerRefs = [startDatePickerRef.value, endDatePickerRef.value];
  datePickerRefs.forEach((datePickerRef) => {
    const inputEls = datePickerRef?.$el.nextSibling.querySelectorAll('input');
    if (inputEls) {
      inputEls.forEach((inputEl: HTMLInputElement) => {
        inputEl.setAttribute("inputmode", "none");
      })
    }
  })
  panelInputModeNone();
  panelTimezone(mergeInputBind.value.timezone);
})

// type ValidationRules = {
//   required: boolean;
//   datetimerngStartLimit?: [number | undefined, false | NumberLimit | TextLimit | FileLimit | DatetimerngLimit, string, unknown];
//   datetimerngEndLimit?: [number | undefined, false | NumberLimit | TextLimit | FileLimit | DatetimerngLimit, string, unknown];
// };

const startValueRef = ref<number | undefined>();
const endValueRef = ref<number | undefined>();

const startRules = computed(() => ({
  required: props.required,
  datetimerngStartLimit: [endValueRef.value, minLength.value, maxLength.value, mergeInputBind.value.timezone, mergeInputBind.value.format]
}));

const endRules = computed(() => ({
  required: props.required,
  datetimerngEndLimit: [startValueRef.value, minLength.value, maxLength.value, mergeInputBind.value.timezone, mergeInputBind.value.format]
}));

const { value: startValue, errorMessage: startErrorMessage, handleChange: handleChangeStart } = useField<number | undefined>(`${mergeField.value.id}[0]`, startRules);
const { value: endValue, errorMessage: endErrorMessage, handleChange: handleChangeEnd } = useField<number | undefined>(`${mergeField.value.id}[1]`, endRules);

// 同步 ref 值
watch(startValue, (val) => startValueRef.value = val);
watch(endValue, (val) => endValueRef.value = val);

</script>

<template>
  <InputWrapper
  :data-field-id="mergeField.id"
  >
    <!--  InputWrapper for group error message, other input type wordcount, etc. -->
    <InputInner>
      <!-- InputInner for other input type prefix in here -->
      <InputFrame 
      :max="checkFieldMax" 
      :disabled="disabled" 
      :inputTotal="inputTotal"
      @removeComponent="emit('removeInputItemFn', valueIndex)"
      >
      <div
        :class="[
          'data-time-picker',
          elStyle
        ]"
      >
        <el-date-picker
          ref="startDatePicker"
          v-model.number="startValue"
          class="datetime-picker-input datetimerng-input"
          :placeholder="t('startDate')"
          :disabled="disabled"
          :disabled-date="startDisabledDate"
          v-bind="clearInputBind"
          v-on="inputOn"
          :type="rngElType"
          :format="rngElFormat"
        />
        <i class="far fa-arrow-right tw-text-xs tw-text-gray-700"></i>
        <el-date-picker
          ref="endDatePicker"
          v-model.number="endValue"
          class="datetime-picker-input datetimerng-input"
          :placeholder="t('endDate')"
          :disabled="disabled"
          :disabled-date="endDisabledDate"
          v-bind="clearInputBind"
          v-on="inputOn"
          :type="rngElType"
          :format="rngElFormat"
        />
        <button
          v-if="mergeInputBind.isClearable && !disabled"
          type="button"
          class="tw-relative tw-px-1 before:tw-absolute before:-tw-inset-2.5 before:tw-content-['']"
          @click.prevent="clearTime"
        >
          <i class="far fa-times-circle tw-text-xs tw-text-gray-700"></i>
        </button>
      </div>
      </InputFrame>
    </InputInner>
    <InkErrorMessage v-if="startErrorMessage || endErrorMessage" :errorText="startErrorMessage || endErrorMessage"/>
  </InputWrapper>
</template>

<style lang="postcss" scoped>
</style>
