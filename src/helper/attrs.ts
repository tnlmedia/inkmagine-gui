import { computed, useAttrs } from "vue"

export const restAttrs = computed(() => {
  const attrs = useAttrs()
  const { class: className, ...restAttrs } = attrs
  return restAttrs
})
