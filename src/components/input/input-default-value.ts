import { computed, Ref } from "vue";
import { UnKnownOptions } from "./field-data-interface";

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
  inputBind: {
    type: Object,
    default: () => ({}),
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

export const useMergeFieldProps = <T extends Record<string, any>>(type: string, field: Ref<T>) => { 
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
    reduce: (option: UnKnownOptions) => option.key,
    label: 'name',
    clearable: false,
    filterable: false,
    searchable: false,
    autoscroll: false,
    selectable: (option: UnKnownOptions) => !option.disabled,
    infiniteFn: undefined as (() => void) | undefined,
    openFn: undefined as (() => void) | undefined,
    closeFn: undefined as (() => void) | undefined,
  }
}
export const useMergeSelectInputBind = (inputBind: Ref<Record<string, any>>) => {
  const mergeInputBind = computed(() => {
    return {
      ...defaultSelectInputBind(),
      ...inputBind.value,
    }
  })
  return { mergeInputBind };
}