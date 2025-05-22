<script setup lang="ts">
import { computed, useTemplateRef, defineEmits, nextTick, PropType, watch, toRef, ref } from 'vue';
import vSelect from 'vue-select'
import { useField } from 'vee-validate';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { defaultInputProps, useMergeFieldProps, useMergeSelectInputBind } from '@/components/input/input-default-value';
import { SelectSharp } from '@/components/input/field-data-interface';
import { t } from '@/helper/i18n';
import { UnKnownOptions } from '@/components/input/field-data-interface';
const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<SelectSharp>,
    required: true,
  },
});
const emit = defineEmits(['removeInputItemFn']);

const {mergeField, checkFieldMax} = useMergeFieldProps<SelectSharp>('select', toRef(props, 'field'));
const { mergeInputBind } = useMergeSelectInputBind(toRef(props, 'inputBind'));

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

const { value, errorMessage } = useField<string | object>(`${mergeField.value.id}[${props.valueIndex}]`, rules);

// style
const elStyle = computed(() => {
  return {
    'active': mergeInputBind.value.activeStyle && value,
    'is-error': errorMessage.value,
  };
});

</script>
<template>
    <InputWrapper>
    <InputInner>
      <InputFrame
      :inputType="field.type"
      :max="checkFieldMax" 
      :disabled="disabled"
      :inputTotal="inputTotal"
      @removeComponent="emit('removeInputItemFn', valueIndex)"
      >
  <!-- :dropdownShouldOpen="() => true" -->
           <!-- @option:selected="onSelected" -->
        <v-select
        v-model="value"
        :disabled="disabled"
        :required="required"
        :placeholder="mergeField.placeholder"
        @open="onOpen"
        @close="onClose"
        class="tw-w-full"
        :class="elStyle"
        :inputId="`${mergeField.id}[${props.valueIndex}]`"
        v-bind="mergeInputBind"
        v-on="inputOn"
        >
          <!-- 選項內容 -->
          <template #option="{ name, depth }">
            <div :class="['option']">
              <span 
              class="tw-mr-2.5 tw-rounded-sm tw-py-1 tw-px-2"
              :style="{ 'padding-left': `calc(${depth > 0 ? depth - 1 : 0}em + 0.5rem)` }"
              >
                <i v-if="depth > 0" class="fal fa-angle-left -tw-rotate-45"></i>
                {{ name }}
              </span>
            </div>
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