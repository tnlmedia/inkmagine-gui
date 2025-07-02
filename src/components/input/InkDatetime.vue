<script setup lang="ts">
import '@/scss/component/_ink-element-plus-datetime.scss';
import { ElDatePicker } from 'element-plus';
import 'element-plus/es/components/date-picker/style/css';
import { computed, onMounted, onUnmounted, PropType, useTemplateRef, toRef, watch, ref } from "vue";
import { useField } from "vee-validate";
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { defaultInputProps, useMergeFieldProps, useMergeDatetimePickerInputBind } from '@/components/input/input-default-value';
import type { DatetimeSharp, DatetimePickerInputBind } from '@/components/input/field-data-interface';
import dayjs, { formatTimeToUnix, formatUnixTime } from '@/helper/dayjs';
import { RestrictTypeMode } from '@/components/input/field-data-interface';

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
const emit = defineEmits(['removeInputItemFn', 'inkChanged']);
const { mergeField, checkFieldMax } = useMergeFieldProps<DatetimeSharp>(props.field.type, toRef(props, 'field'));
const { mergeInputBind, clearInputBind, panelInputModeNone, panelTimezone } = useMergeDatetimePickerInputBind(toRef(props, 'inputBind'));

const datetimeType = computed(() => {
  if(mergeInputBind.value.type) return mergeInputBind.value.type;
  switch(mergeField.value.type){
    case 'date':
    return 'date'
    default:
    return 'datetime'
  }
});
const datetimeFormat = computed(() => {
  if(mergeInputBind.value.format) return mergeInputBind.value.format;
  switch(mergeField.value.type){
    case 'date':
    return 'YYYY/MM/DD'
    default:
    return 'YYYY/MM/DD HH:mm'
  }
});
const clearTime = () => {
  handleChange(undefined);
  displayValue.value = undefined;
};
const disabledDate = (date: Date) => {
  if(mergeInputBind.value.restrict.restrictType === RestrictTypeMode.PAST) {
    return dayjs.tz(date, mergeInputBind.value.timezone).unix() > dayjs.tz(dayjs(), mergeInputBind.value.timezone).endOf('day').unix()
  };
  if(mergeInputBind.value.restrict.restrictType === RestrictTypeMode.FUTURE) {
    return dayjs.tz(date, mergeInputBind.value.timezone).unix() < dayjs.tz(dayjs(), mergeInputBind.value.timezone).startOf('day').unix()
  };
  return false;
}

const startDatePickerRef = useTemplateRef('startDatePicker');

const elStyle = computed(() => {
  return {
    'tw-border-danger-400': startErrorMessage.value,
    'tw-disabled': props.disabled,
  };
});

const datetimeWrapperClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('is-text') || target.closest('.is-text')) {
    displayValue.value = dayjs.tz(dayjs(), mergeInputBind.value.timezone).format(datetimeFormat.value)
  }
}

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
  panelTimezone(mergeInputBind.value.timezone);


  // now click
  const popperIdEl = document.querySelector(`.js-datetime-${mergeField.value.id}-popper`) as HTMLElement;
  if (popperIdEl) { 
    popperIdEl.addEventListener('click', (e: MouseEvent) => { 
      datetimeWrapperClick(e);
    })
  }
})

onUnmounted(() => { 
  const popperIdEl = document.querySelector(`.js-datetime-${mergeField.value.id}-popper`) as HTMLElement;
  if (popperIdEl) { 
    popperIdEl.removeEventListener('click', (e: MouseEvent) => { 
      datetimeWrapperClick(e);
    })
  }
})

const rules = computed(() => ({
  required: props.required,
  datetimeRestrict: [mergeInputBind.value.restrict, mergeInputBind.value.timezone, datetimeFormat.value]
}));
const { value: startValue, errorMessage: startErrorMessage, handleChange } = useField<number | undefined>(`${mergeField.value.id}[${props.valueIndex}]`, rules);

const displayValue = ref<string | undefined>();
watch(startValue, () => {
  if(startValue.value) {
    displayValue.value = formatUnixTime(mergeInputBind.value.timezone, startValue.value, datetimeFormat.value);
  }else{
    displayValue.value = undefined;
  }
  emit('inkChanged', startValue.value);
}, { immediate: true })
watch(displayValue, (newVal, oldVal) => {
  if (newVal) {
    if(newVal === oldVal) return;
    const targetTime = dayjs.tz(newVal, mergeInputBind.value.timezone).format();
    const utcTimestamp = formatTimeToUnix(targetTime);
    handleChange(utcTimestamp);
  }else{
    handleChange(undefined);
  }
})
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
      :inputType="mergeField.type"
      @removeComponent="emit('removeInputItemFn', valueIndex)"
      >
      <div
        :class="[
          'date-time-picker tw-max-w-[300px]',
          elStyle
        ]"
      >
        <el-date-picker
          ref="startDatePicker"
          v-model="displayValue"
          class="datetime-picker-input"
          :placeholder="mergeField.placeholder"
          :disabled="disabled"
          :disabled-date="disabledDate"
          v-bind="clearInputBind"
          v-on="inputOn"
          :type="datetimeType"
          :format="datetimeFormat"
          :value-format="datetimeFormat"
          :popper-class="`${mergeInputBind.popperClass} js-datetime-${mergeField.id}-popper`"
        />
        <button
          v-if="mergeInputBind.isClearable && !disabled && startValue"
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
