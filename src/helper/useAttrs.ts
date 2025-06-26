import { useAttrs, computed } from "vue"
export const useRestAttrs = () => {
  const attrs = useAttrs()
  return computed(() => {
      const { class: className, ...restAttrs } = attrs
      return restAttrs    
    }
  )
}