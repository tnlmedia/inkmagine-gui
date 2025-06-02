import { computed, Ref } from "vue";
import type { CheckBoxInputBind, SelectInputBind, SelectReduceReturn, UnKnownOptions, DatetimePickerInputBind } from "./field-data-interface";

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
    return Array.isArray(mergeField.value.limit) && typeof mergeField.value.limit[0] === 'number' ? mergeField.value.limit[0] : undefined;
  });
  const maxLength = computed(() => {
    return Array.isArray(mergeField.value.limit) && typeof mergeField.value.limit[1] === 'number' ? mergeField.value.limit[1] : undefined;
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

// select
const defaultSelectInputBind = () => {
  return {
    hasNextPage: false,
    activeStyle: false,
    options: [],
    reduce: (option: UnKnownOptions) => option.key as SelectReduceReturn,
    label: 'name',
    clearable: true,
    filterable: false,
    searchable: false,
    autoscroll: false,
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

// datetime picker
const defaultDatetimePickerInputBind = () => { 
  return {
    isClearable: true,
    type: 'datetime',
    format: 'YYYY/MM/DD HH:mm',
    clearable: false,
    teleported: true,
    valueFormat: 'X',
  }
}
export const useMergeDatetimePickerInputBind = (inputBind: Ref<Record<string, unknown>>) => {
  const mergeInputBind = computed<DatetimePickerInputBind>(() => {
    return {
      ...defaultDatetimePickerInputBind(),
      ...inputBind.value,
      popperClass: `${inputBind.value.popperClass} js-datetime-popper`,
    }
  })

  const clearInputBind = computed(() => {
    const clearInputBind: Record<string, unknown> = {}
    Object.keys(mergeInputBind.value).forEach(key => {
      if(key !== 'isClearable'){
        clearInputBind[key] = mergeInputBind.value[key as keyof DatetimePickerInputBind];
      }
    })
    return clearInputBind;
  })
  return { mergeInputBind, clearInputBind };
}