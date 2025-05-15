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