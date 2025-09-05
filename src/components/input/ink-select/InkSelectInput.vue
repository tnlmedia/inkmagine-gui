<script setup lang="ts">
import { computed, useTemplateRef, defineEmits, nextTick, PropType, watch, toRef, ref } from 'vue';
import { SelectSharp } from '@/components/input/field-data-interface';
import { defaultInputProps, useMergeFieldProps } from '@/components/input/input-default-value';
import { useField } from 'vee-validate';
import { t } from '@/helper/i18n';
import { useRestAttrs } from '@/helper/useAttrs';
import vSelect from 'vue-select';


const props = defineProps({
  ...defaultInputProps,
  activeStyle: {
    type: Boolean,
    default: false,
    required: false,
  },
  options: {
    type: Array,
    default: [],
  },
  hasNextPage: {
    type: Boolean,
    default: false,
    required: false,
  },
  field: {
    type: Object as PropType<SelectSharp>,
    required: true,
  },
  infiniteFn: {
    type: Function,
    required: false,
  }
});

const {mergeField, minLength, maxLength, checkFieldMax} = useMergeFieldProps<SelectSharp>('select', toRef(props, 'field'));

const restAttrs = useRestAttrs()

// const onSelected = () => {
//   emit('optionOnSelected', value.value);
// }

const emit = defineEmits(['infiniteFn','openFn','closeFn']);

// get infinite data start
const isObserver = ref(false);
const load = useTemplateRef('load');
const infiniteScrollHandler = async ([{ isIntersecting, target }]: IntersectionObserverEntry[]) => {
  if (isIntersecting) {
    const ul = (target as HTMLElement).offsetParent as HTMLElement;
    const scrollTop = ul.scrollTop;
    // emit('infiniteFn');
    if(props.infiniteFn){
      props.infiniteFn();
    }
    const watchOptions = watch(() => props.options, () => {
      ul.scrollTop = scrollTop;
      watchOptions();
    })
  }
}
const observer = new IntersectionObserver(infiniteScrollHandler)
const checkAndObserver = () => { 
  if (props.hasNextPage && load.value && !isObserver.value) {
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
  emit('openFn');
}
const onClose = () => {
  disconnectObserver();
  emit('closeFn');
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
    'active': props.activeStyle && value,
    'is-error': errorMessage.value,
  };
});
</script>
<template>
  <!-- :dropdownShouldOpen="() => true" -->
           <!-- @option:selected="onSelected" -->
        <v-select
        v-model="value"
        :options="options"
        :reduce="(option:typeof props.options[0]) => option.id || option.key"
        label="name"
        :clearable="false"
        :filterable="false"
        :searchable="false"
        :autoscroll="false"
        :selectable="(option:typeof props.options[0]) => !option.disabled"
        :disabled="disabled"
        :required="required"
        :inputId="`${mergeField.id}[${props.valueIndex}]`"
        :placeholder="mergeField.placeholder"
        @open="onOpen"
        @close="onClose"
        class="tw-w-full"
        :class="elStyle"
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
          <li v-show="hasNextPage" ref="load" class="loader tw-text-sm tw-text-gray-600 tw-italic">
            {{ t('loading') }}
          </li>
        </template>
        </v-select>
</template>
