
import { computed } from "vue";

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
}

export const fieldDefaultValue = (type: string) => {
  return{
      id: '',
      type: type,
      max: 1,
      limit: false,
    }
}

export const useMergeFieldProps = <T>(type: string, field: T) => { 
  const defaultField = fieldDefaultValue(type);
  const mergeField = computed(() => {
    return {
      ...defaultField,
      ...field,
    }
  })
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