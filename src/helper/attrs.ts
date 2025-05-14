import { useAttrs } from "vue"

export const restAttrs = () => {
  const attrs = useAttrs()
  const { class: className, ...restAttrs } = attrs
  return restAttrs
}
