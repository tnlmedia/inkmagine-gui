import { computed, Ref } from "vue";
import type { CheckBoxInputBind, SelectInputBind, SelectReduceReturn, UnKnownOptions, DatetimePickerInputBind, DatetimerngInputBind, HashtagInputBind } from "@/components/input/field-data-interface";
import { RestrictTypeMode } from "@/components/input/field-data-interface";
import { utcTimezone } from "@/helper/dayjs";

export const singleFieldTypes = ['select', 'checkbox', 'radio', 'switch', 'datetime', 'date', 'datetimerng', 'daterng', 'hashtag'];

export const defaultInputProps = {
  valueIndex: {
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
  inputOn: {
    type: Object,
  },
}

export const fieldDefaultValue = (type: string) => {
  return{
      id: '',
      type: type,
      max: 1,
      limit: false,
    }
}

export const useMergeFieldProps = <T extends Record<string, unknown>>(type: string, field: Ref<T>) => { 
  const defaultField = fieldDefaultValue(type);
  const mergeField = computed(() => {
    return {
      ...defaultField,
      ...field.value,
    }
  });
  // console.log('field',field);
  // console.log('mergeField',mergeField.value);
  const minLength = computed(() => {
    return Array.isArray(mergeField.value.limit) && typeof mergeField.value.limit[0] === 'number' && mergeField.value.limit[0] ? mergeField.value.limit[0] : undefined;
  });
  const maxLength = computed(() => {
    return Array.isArray(mergeField.value.limit) && typeof mergeField.value.limit[1] === 'number' && mergeField.value.limit[1] ? mergeField.value.limit[1] : undefined;
  });
  const checkFieldMax = computed(() => { 
      if (mergeField.value.max) {
        return mergeField.value.max;
      } else if (mergeField.value.max === 0) {
        return Infinity;
      }
      return 1;
    }
  )
  return { mergeField, minLength, maxLength, checkFieldMax };
}

// vue select series
const defaultAllSelectInputBind = () => {
  return {
    activeStyle: false,
    options: [],
    label: 'name',
    filterable: false,
    clearable: true,
    autoscroll: false,
  }
}
// select series (single select)
const defaultSelectInputBind = () => {
  return {
    ...defaultAllSelectInputBind(),
    hasNextPage: false,
    searchable: false,
    reduce: (option: UnKnownOptions) => option.key as SelectReduceReturn,
    selectable: (option: UnKnownOptions) => !option.disabled,
    infiniteFn: undefined as (() => void) | undefined,
    openFn: undefined as (() => void) | undefined,
    closeFn: undefined as (() => void) | undefined,
  }
}
export const useMergeSelectInputBind = (inputBind: Ref<Record<string, unknown>>) => {
  const mergeInputBind = computed<SelectInputBind>(() => {
    return {
      ...defaultSelectInputBind(),
      ...inputBind.value,
    }
  })
  const clearInputBind = computed<SelectInputBind>(() => {
    const clearInputBind:Record<string, unknown> = {}
    Object.keys(mergeInputBind.value).forEach(key => {
      if(key !== 'infiniteFn' && key !== 'openFn' && key !== 'closeFn' && key !== 'hasNextPage' && key !== 'activeStyle'){
        clearInputBind[key] = mergeInputBind.value[key as keyof SelectInputBind];
      }
    })
    return clearInputBind;
  });
  return { mergeInputBind, clearInputBind };
}

// hashtag series (multiple select)
// noDrop, , loading,
const defaultHashtagInputBind = () => {
  return {
    ...defaultAllSelectInputBind(),
    searchable: true,
  }
}
export const useMergeHashtagInputBind = (inputBind: Ref<Record<string, unknown>>) => {
  const mergeInputBind = computed(() => {
    return {
      ...defaultHashtagInputBind(),
      ...inputBind.value,
      noDrop: inputBind.value.noDrop,
      loading: inputBind.value.loading,
    }
  })
  const clearInputBind = computed(() => {
    const clearInputBind: Record<string, unknown> = {}
    Object.keys(mergeInputBind.value).forEach(key => {
      if(key !== 'activeStyle'){
        clearInputBind[key] = mergeInputBind.value[key as keyof HashtagInputBind];
      }
    })
    return clearInputBind;
  });
  return { mergeInputBind, clearInputBind };
}
// checkbox
const defaultCheckBoxInputBind = (): CheckBoxInputBind => {
  return {
    hasNextPage: false,
    options: [],
  }
}
export const useMergeCheckBoxInputBind = (inputBind: Ref<Record<string, unknown>>) => { 
  const mergeInputBind = computed<CheckBoxInputBind>(() => {
    return {
      ...defaultCheckBoxInputBind() as CheckBoxInputBind,
      ...inputBind.value,
    }
  })
  const clearInputBind = computed(() => {
    const clearInputBind: Record<string, unknown> = {}
    Object.keys(mergeInputBind.value).forEach(key => {
      if(key !== 'hasNextPage' && key !== 'infiniteFn' && key !== 'options' && key !== 'label' && key !== 'valueKey'){
        clearInputBind[key] = mergeInputBind.value[key as keyof CheckBoxInputBind];
      }
    })
    return clearInputBind;
  });

  // console.log('mergeInputBind',mergeInputBind.value);
  return { mergeInputBind, clearInputBind };
}

// all datetime
const defaultAllDatetimeInputBind = () => { 
  return {
    isClearable: true,
    clearable: false,
    teleported: false, // for click now (is-text)
  }
}
const defaultAllDatetimeMethod = () => {

  const mainInputModeNone = () => {

  }
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
  const panelTimezone = (timezone:DatetimePickerInputBind['timezone']) => {
    if(!timezone) return;
      let els = document.querySelectorAll<HTMLElement>('.el-picker-panel__footer');
      els.forEach(el => {
        let remarkTimezone = el.querySelector<HTMLElement>('.js-remarkTimezone');
        if (remarkTimezone) return;
        let utcEl = document.createElement('span');
        utcEl.className = 'js-remarkTimezone remark-timezone tw-text-gray tw-text-sm mr-auto';
        utcEl.textContent = `(${utcTimezone(timezone)})`;
        el.prepend(utcEl);
      })
  }

  return {
    panelInputModeNone,
    panelTimezone,
  }
}

// datetime series
const defaultDatetimePickerInputBind = () => { 
  return {
    ...defaultAllDatetimeInputBind(),
    restrict: {
      restrictType: RestrictTypeMode.UNLIMITED,
      shiftSecond: 0,
    },
  }
}
export const useMergeDatetimePickerInputBind = (inputBind: Ref<Record<string, unknown>>) => {
  const mergeInputBind = computed<DatetimePickerInputBind>(() => {
    return {
      ...defaultDatetimePickerInputBind(),
      ...inputBind.value,
      timezone: inputBind.value.timezone as DatetimePickerInputBind['timezone'],
      popperClass: `${inputBind.value.popperClass} js-datetime-popper`,
    }
  })

  const clearInputBind = computed(() => {
    const clearInputBind: Record<string, unknown> = {}
    Object.keys(mergeInputBind.value).forEach(key => {
      if(key !== 'isClearable' && key !== 'restrict' && key !== 'timezone'){
        clearInputBind[key] = mergeInputBind.value[key as keyof DatetimePickerInputBind];
      }
    })
    return clearInputBind;
  })
  
  return { mergeInputBind, clearInputBind, ...defaultAllDatetimeMethod() };
}

// datetimerange series
const defaultDatetimerngInputBind = () => { 
  return {
    ...defaultAllDatetimeInputBind(),
    activeStyle: false,
  }
}
export const useMergeDatetimerngInputBind = (inputBind: Ref<Record<string, unknown>>) => { 
  const mergeInputBind = computed<DatetimerngInputBind>(() => {
    return {
      ...defaultDatetimerngInputBind(),
      ...inputBind.value,
      timezone: inputBind.value.timezone as DatetimePickerInputBind['timezone'],
    }
  })
  const clearInputBind = computed(() => {
    const clearInputBind: Record<string, unknown> = {}
    Object.keys(mergeInputBind.value).forEach(key => {
      if(key !== 'isClearable' && key !== 'activeStyle' && key !== 'timezone'){
        clearInputBind[key] = mergeInputBind.value[key as keyof DatetimerngInputBind];
      }
    })
    return clearInputBind;
  })
  return { mergeInputBind, clearInputBind, ...defaultAllDatetimeMethod() };
}