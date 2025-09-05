<script setup lang="ts">
import { computed, useTemplateRef, defineEmits, nextTick, PropType, watch, toRef } from 'vue';
import vSelect from 'vue-select'
// import useField from '@/helper/useField';
import { useField } from 'vee-validate';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { defaultInputProps, useMergeFieldProps } from '@/components/input/input-default-value';
import { SelectSharp } from '@/components/input/field-data-interface';
import { t } from '@/helper/i18n';

const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<SelectSharp>,
    required: true,
  }
});
const emit = defineEmits(['removeInputItemFn']);

const {mergeField, minLength, maxLength, checkFieldMax} = useMergeFieldProps<SelectSharp>('select', toRef(props, 'field'));

// watch(() => props.field, (newField) => {
//   console.log('watch field d2',newField);
// }, { deep: true });
// const onSelected = () => {
//   emit('optionOnSelected', value.value);
// }
// // get infinite data start
// const load = useTemplateRef('load');
// const infiniteScrollHandler = ([{ isIntersecting, target }]: IntersectionObserverEntry[]) => {
//   if (isIntersecting) {
//       emit('infiniteFn');
//   }
// }
// const observer = new IntersectionObserver(infiniteScrollHandler)
// const onOpen = async () => {
//   await nextTick()
//   if (props.hasNextPage && load.value) { 
//     observer.observe(load.value);
//   }
// }
// const onClose = () => {
//   observer.disconnect();
// }
// get infinite data end

const rules = computed(() => ({
  required: props.required,
}));
const { value, errorMessage } = useField<string | object>(`${mergeField.value.id}[${props.valueIndex}]`, rules);


// style
// const elStyle = computed(() => {
//   return {
//     'active': props.activeStyle && value,
//     'is-error': errorMessage.value,
//   };
// });

</script>
<template>
  <InputWrapper>
    <InputInner>
      <InputFrame
      :inputType="mergeField.type"
      :max="checkFieldMax" 
      :disabled="disabled"
      :inputTotal="inputTotal"
      @removeComponent="emit('removeInputItemFn', valueIndex)"
      >
        <slot name="inputSlot" />
      </InputFrame>
    </InputInner>
    <InkErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
  </InputWrapper>
</template>
<style lang="postcss" scoped>
.v-select.vs--single {
  :deep(.vs__dropdown-menu) {
    --vs-dropdown-min-width: auto;
  }
}
</style>