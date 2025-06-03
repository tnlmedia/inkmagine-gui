<script setup lang="ts">
import '@/scss/component/_ink-element-plus-datetime.scss';
import { ElDatePicker } from 'element-plus';
import 'element-plus/es/components/date-picker/style/css';
import { computed, onMounted, PropType, useTemplateRef, toRef } from "vue";
import { useField } from "vee-validate";
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { defaultInputProps, useMergeFieldProps, useMergeDatetimePickerInputBind } from '@/components/input/input-default-value';
import type { DatetimeSharp, DatetimePickerInputBind } from '@/components/input/field-data-interface';
import dayjs, { utcTimezone, formatTimeToUnix, formatTimeToValueOf, convertUnixToStartOf, convertValueOfToStartOf } from '@/helper/dayjs';
import { RestrictTypeMode } from '@/components/input/field-data-interface';

type DatePickerType = 'year' | 'month' | 'date' | 'datetime' | 'week' | 'datetimerange' | 'daterange';

const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<DatetimeSharp>,
    required: true,
  },
  inputBind: {
    type: Object as PropType<DatetimePickerInputBind>,
    default: () => ({}),
  },
});
const emit = defineEmits(['removeInputItemFn']);
const { mergeField, checkFieldMax } = useMergeFieldProps<DatetimeSharp>('datetime', toRef(props, 'field'));
const { mergeInputBind, clearInputBind } = useMergeDatetimePickerInputBind(toRef(props, 'inputBind'));

const clearTime = () => {
  handleChange(undefined);
};
const disabledDate = (date: Date) => {
  // if(!mergeInputBind.value.restrict) return false;
  // if(!mergeInputBind.value.restrict.earliest && !mergeInputBind.value.restrict.latest) return false;

  // let dateTimestamp;
  // if(mergeInputBind.value.valueFormat === 'X'){
  //   dateTimestamp = formatTimeToUnix(date);
  // } else {
  //   dateTimestamp = formatTimeToValueOf(date);
  // }

  // let getEarliestStartOfDayTimestamp;
  // if(mergeInputBind.value.restrict?.earliest){
  //   if(mergeInputBind.value.valueFormat === 'X'){
  //     getEarliestStartOfDayTimestamp = convertUnixToStartOf(mergeInputBind.value.restrict.earliest);
  //   }else{
  //     getEarliestStartOfDayTimestamp = convertValueOfToStartOf(mergeInputBind.value.restrict.earliest);
  //   }
  //   if(dateTimestamp < getEarliestStartOfDayTimestamp){
  //     // true means disabled the date
  //     // disabled early then restrict.earliest date
  //     return true;
  //   }
  // }

  // if((mergeInputBind.value.restrict?.latest && dateTimestamp > mergeInputBind.value.restrict.latest)){
  //   // disabled later then restrict.latest date
  //   return true;
  // }
  if(mergeInputBind.value.restrict.restrictType === RestrictTypeMode.PAST) {
    return formatTimeToUnix(date) > dayjs().unix()
  };
  if(mergeInputBind.value.restrict.restrictType === RestrictTypeMode.FUTURE) {
    return formatTimeToUnix(date) < dayjs().startOf('day').unix()
  };
  return false;
}

const startDatePickerRef = useTemplateRef('startDatePicker');

const panelInputModeNone = () => {
  const popperEls = document.querySelectorAll(`.js-datetime-popper`);
  popperEls.forEach((popperEl) => {
    const inputEls = popperEl.querySelectorAll('input');
    if (inputEls) {
      inputEls.forEach(inputEl => {
        inputEl.setAttribute("inputmode", "none");
      })
    }
  })
}
const panelTimezone = () => {
   if(!mergeInputBind.value.timezone) return;
    let els = document.querySelectorAll<HTMLElement>('.el-picker-panel__footer');
    els.forEach(el => {
      let remarkTimezone = el.querySelector<HTMLElement>('.js-remarkTimezone');
      if (remarkTimezone) return;
      let utcEl = document.createElement('span');
      utcEl.className = 'js-remarkTimezone remark-timezone tw-text-gray tw-text-sm mr-auto';
      utcEl.textContent = `(${utcTimezone(mergeInputBind.value.timezone as string)})`;
      el.prepend(utcEl);
    })
}

const elStyle = computed(() => {
  return {
    'tw-border-danger-400': startErrorMessage.value,
    'tw-disabled': props.disabled,
  };
});

// watch(()=>mergeInputBind.value.restrict, ()=>{
//   let restrictTipCount = 0;
//   if(mergeInputBind.value.restrict && !restrictTipCount){
//     restrictTipCount++;
//     console.warn('InkDatetime inputBind.restrict Tip: Please check the inputBind.timezone is set and inputBind.restrict timestamp type is sanme as inputBind.valueFormat')
//   }
// })

onMounted(() => {
  const datePickerRefs = [startDatePickerRef.value];
  datePickerRefs.forEach((datePickerRef) => {
    const inputEls = datePickerRef?.$el.nextSibling.querySelectorAll('input');
    if (inputEls) {
      inputEls.forEach((inputEl: HTMLInputElement) => {
        inputEl.setAttribute("inputmode", "none");
      })
    }
  })
  panelInputModeNone();
  panelTimezone();
})

const rules = computed(() => ({
  required: props.required,
  datetimeRestrict: [mergeInputBind.value.restrict, mergeInputBind.value.timezone, mergeInputBind.value.format]
}));
const { value: startValue, errorMessage: startErrorMessage, handleChange } = useField<number | undefined>(`${mergeField.value.id}[${props.valueIndex}]`, rules);

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
          class="datetime-picker-input"
          :placeholder="mergeField.placeholder"
          :disabled="disabled"
          :disabled-date="disabledDate"
          v-bind="clearInputBind"
          v-on="inputOn"
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
    <InkErrorMessage v-if="startErrorMessage" :errorText="startErrorMessage"/>
  </InputWrapper>
</template>

<style lang="postcss" scoped>
</style>
