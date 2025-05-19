export const defaultInputProps = {
  index: {
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
    }
}
export const checkFieldMax = (max: number | undefined) => { 
  if (max) {
    return max;
  } else if (max === 0) {
    return Infinity;
  }
  return 1;
}