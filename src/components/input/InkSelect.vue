<script setup lang="ts">
import '@/scss/component/vue-select/_ink-vue-select.scss';
import { computed, useTemplateRef, defineEmits, nextTick, type PropType, watch, toRef, ref, h } from 'vue';
import vSelect from 'vue-select'
import { useField } from 'vee-validate';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { defaultInputProps, useMergeFieldProps, useMergeSelectInputBind } from '@/components/input/input-default-value';
import { SelectSharp } from '@/components/input/field-data-interface';
import { t } from '@/helper/i18n';
import type { SelectInputBind, UnKnownOptions, SelectReduceReturn } from '@/components/input/field-data-interface';

vSelect.props.components.default = () => ({
  // custom icon
  OpenIndicator: {
    render: () => h('i', {class: 'far fa-chevron-down tw-text-base tw-leading-none'}),
  },
  Deselect: {
    render: () => h('i', {class: 'fal fa-times tw-text-gray-900 tw-leading-none'}),
  },
});

const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<SelectSharp>,
    required: true,
  },
  inputBind: {
    type: Object as PropType<SelectInputBind>,
    default: () => ({}),
  },
});
const emit = defineEmits(['removeInputItemFn']);

const {mergeField, checkFieldMax} = useMergeFieldProps<SelectSharp>('select', toRef(props, 'field'));
const { mergeInputBind, clearInputBind } = useMergeSelectInputBind(toRef(props, 'inputBind'));

const isObserver = ref(false);
const load = useTemplateRef('load');
const infiniteScrollHandler = async ([{ isIntersecting, target }]: IntersectionObserverEntry[]) => {
  if (isIntersecting) {
    const ul = (target as HTMLElement).offsetParent as HTMLElement;
    const scrollTop = ul.scrollTop;
    if(mergeInputBind.value.infiniteFn){
      mergeInputBind.value.infiniteFn();
    }
    const watchOptions = watch(() => mergeInputBind.value.options, () => {
      ul.scrollTop = scrollTop;
      watchOptions();
    })
  }
}
const observer = new IntersectionObserver(infiniteScrollHandler)
const checkAndObserver = () => { 
  if (mergeInputBind.value.hasNextPage && load.value && !isObserver.value) {
    observer.observe(load.value);
    isObserver.value = true;
  }
}
const disconnectObserver = () => {
  observer.disconnect();
  isObserver.value = false;
}
const onOpen = async () => {
  await nextTick()
  checkAndObserver();
  // emit('openFn');
  if(mergeInputBind.value.openFn){
    mergeInputBind.value.openFn();
  }
}
const onClose = () => {
  disconnectObserver();
  // emit('closeFn');
  if(mergeInputBind.value.closeFn){
    mergeInputBind.value.closeFn();
  }
}
watch(() => load.value, async () => {
  if (!isObserver.value && load.value) {
    // for first time search
    await nextTick()
    checkAndObserver();
  } else {
    // for open dropdown and do search
    disconnectObserver();
  }
})
// get infinite data end

const rules = computed(() => ({
  required: props.required,
}));

const { value, errorMessage, handleChange } = useField<SelectReduceReturn | UnKnownOptions>(`${mergeField.value.id}[${props.valueIndex}]`, rules);

const displayValue = ref<SelectReduceReturn | UnKnownOptions>();
watch(value, (newVal, oldVal) => {
  // for displayValue value type is not object
  if(newVal !== oldVal && typeof displayValue.value !== 'object' && displayValue.value !== newVal){
    displayValue.value = newVal;
  }
}, { immediate: true });
watch(displayValue, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if( typeof newVal === 'object' && newVal !== null ){
      const reduceValue = mergeInputBind.value.reduce?.(newVal);
      handleChange(reduceValue);
    } else {
      handleChange(newVal);
    }
  }
}, { immediate: true });

// style
const elStyle = computed(() => {
  return {
    'active': mergeInputBind.value.activeStyle && value.value,
    'is-error': errorMessage.value,
    'option-0-divider': mergeInputBind.value.optionDivider?.some((item: number) => item === 0),
    'option-1-divider': mergeInputBind.value.optionDivider?.some((item: number) => item === 1),
    'option-2-divider': mergeInputBind.value.optionDivider?.some((item: number) => item === 2),
  };
});

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
  <!-- :dropdownShouldOpen="() => true" -->
           <!-- @option:selected="onSelected" -->
        <v-select
        v-model="displayValue"
        :disabled="disabled"
        :required="required"
        :placeholder="mergeField.placeholder || t('select')"
        @open="onOpen"
        @close="onClose"
        class="tw-w-full tw-max-w-[300px]"
        :class="elStyle"
        :inputId="`${mergeField.id}[${props.valueIndex}]`"
        :clearable="required ? false : !disabled"
        v-bind="clearInputBind"
        v-on="inputOn"
        >
          <!-- 選項內容 -->
          <template #option="options">
            <div :class="['option']">
              <span 
              class="tw-mr-2.5 tw-py-1"
              :style="{ 'padding-left': `calc(${options.depth > 0 ? options.depth - 1 : 0}em + 0.5rem)` }"
              >
                <i v-if="options.depth > 0" class="fal fa-angle-left -tw-rotate-45"></i>
                {{ options[clearInputBind?.label || 'name'] }}
              </span>
            </div>
          </template>
          <!-- 無選項內容 -->
          <template #no-options>
            {{ t('noResultsFound') }}
          </template>
          <template v-if="disabled" #open-indicator="{ attributes }">
            <!-- 自定義圖示或完全空白 -->
            {{ null }}
          </template>
          <template #list-footer>
          <li v-show="mergeInputBind.hasNextPage" ref="load" class="loader tw-text-sm tw-text-gray-600 tw-italic">
            {{ t('loading') }}
          </li>
        </template>
        </v-select>
              </InputFrame>
    </InputInner>
    <InkErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
  </InputWrapper>
</template>
<!-- <style lang="postcss" scoped>
.v-select.vs--single {
  :deep(.vs__dropdown-menu) {
    --vs-dropdown-min-width: auto;
  }
}
</style> -->