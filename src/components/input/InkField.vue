<script setup lang="ts">
import '@/scss/component/_ink-form.scss';
import { InkVTooltip } from '@/components/ink-tooltip/Ink-tooltip';
import InkButton from '@/components/InkButton.vue';
import { t } from '@/helper/i18n';
import { defineAsyncComponent, computed, watch, toRef, onMounted, nextTick } from 'vue';
import type { FieldDataSharp, UnKnownOptions} from '@/components/input/field-data-interface';
import { useFieldArray } from 'vee-validate';
import InkFieldMessage from '@/components/input/InkFieldMessage.vue';
import { fieldDefaultValue, useMergeFieldProps } from '@/components/input/input-default-value';
import { singleFieldTypes } from '@/components/input/input-default-value';
interface DraggableItemOrder {
    inputId: string;
    value: string | number | boolean | object;
  }
interface FieldProps {
  field: FieldDataSharp; // field require for attribute required calculate data
  disabled?: boolean; // for attribute disabled
  required?: boolean; // for attribute required
  inputBind?: Record<string, any>;
  inputOn?: Record<string, any>;
}

const props = withDefaults(defineProps<FieldProps>(), {
});


const componentMap = {
  text: defineAsyncComponent(() => import('@/components/input/InkText.vue')),
  url: defineAsyncComponent(() => import('@/components/input/InkUrl.vue')),
  textarea: defineAsyncComponent(() => import('@/components/input/InkTextarea.vue')),
  select: defineAsyncComponent(() => import('@/components/input/InkSelect.vue')),
  hashtag: defineAsyncComponent(() => import('@/components/input/InkHashtag.vue')),
  checkbox: defineAsyncComponent(() => import('@/components/input/InkCheckbox.vue')),
  radio: defineAsyncComponent(() => import('@/components/input/InkRadio.vue')),
  switch: defineAsyncComponent(() => import('@/components/input/InkSwitch.vue')),
  datetime: defineAsyncComponent(() => import('@/components/input/InkDatetime.vue')),
  date: defineAsyncComponent(() => import('@/components/input/InkDatetime.vue')),
  datetimerng: defineAsyncComponent(() => import('@/components/input/InkDatetimerng.vue')),
  daterng: defineAsyncComponent(() => import('@/components/input/InkDatetimerng.vue')),
} as const;

type FieldType = keyof typeof componentMap;

// 使用 computed 來獲取當前的欄位類型
const fieldType = computed(() => props.field.type as FieldType);

const { checkFieldMax, mergeField } = useMergeFieldProps<FieldDataSharp>(fieldType.value, toRef(props, 'field'));

// watch(() => props.field, (newField) => {
//   console.log('watch field d1',newField);
// }, { deep: true });

const dynamicComponent = computed(() => {
  return componentMap[mergeField.value.type as FieldType];
});


// 根據欄位類型返回對應的值類型 (邊做 input 的 .vue 邊測試這裡的 type 是否可行，會因應使用的套件而不同)
type GetFieldValueType<T extends FieldType> = 
  T extends 'text' | 'slug' | 'email' | 'url' | 'password' | 'time' | 'textarea' | 'html'
    ? string 
    : T extends 'number' | 'datetime' | 'date' | 'datetimerng' | 'daterng'
    ? number | undefined
    : T extends 'switch' 
    ? boolean 
    : T extends 'json' | 'hashtag'
    ? object 
    : T extends 'select' | 'checkbox' | 'radio'
    ? UnKnownOptions[] | string[] | number[] | null | undefined
    : T extends 'file' | 'image'
    ? number | object
    : never;


// 使用 fieldType.value 來決定 useFieldArray 的類型
const { remove, push, fields, update, replace } = useFieldArray<GetFieldValueType<typeof fieldType.value>>(mergeField.value.id);

const inputTotal = computed(() => fields.value.length);

const onRemoveItemHandler = (index: number) => {
  remove(index);
};

const onUpdateItem = (index: number, value: GetFieldValueType<typeof fieldType.value>) => {
  update(index, value);
};

const onPushItem = () => {
  switch (fieldType.value) {
    case 'text':
    // case 'slug':
    // case 'email':
    case 'url':
    // case 'password':
    // case 'time':
    case 'textarea':
    // case 'html':
      push('');
      break;
    case 'checkbox':
    case 'radio':
    case 'hashtag':
      break;
    case 'daterng':
    case 'datetimerng':
      push([undefined, undefined]);
      break;
    default:
      push(undefined);
      break;
  }
}

onMounted(async () => {
  await nextTick()
  if (fields.value.length === 0) {
    onPushItem()
  }
})

</script>

<template>
  <fieldset 
  class="js-dynamic-component tw-flex tw-flex-wrap tw-gap-2"
  :data-field-type="mergeField.type"
  :class="{
    'tw-flex-row tw-items-center': mergeField.type === 'switch',
    'tw-flex-col': mergeField.type !== 'switch',
  }"
  >
    <div v-if="mergeField.name" :class="['tw-text-base tw-font-semibold tw-flex tw-items-center tw-gap-1']">
      {{ mergeField.name }}
      <InkVTooltip v-if="mergeField.tip">
        <button type="button" class="tw-btn-transparent tw-btn-icon-xs"><i class="fa-regular fa-circle-info"></i></button>
        <template #popper>
          {{ mergeField.tip }}
        </template>
      </InkVTooltip>
      <span v-if="required && mergeField.type !== 'switch'" class="tw-text-primary-500">
         {{ t('requiredHint') }}
      </span>
    </div>
    <!-- <slot/> -->
    <template v-if="!singleFieldTypes.includes(mergeField.type)">
    <component 
    v-for="(item, valueIndex) in fields"
    :key="`${item.key}-${valueIndex}`"
    :is="dynamicComponent"
    :valueIndex="valueIndex"
    :inputTotal="inputTotal"
    :field="mergeField"
    :required="required"
    :disabled="disabled"
    @removeInputItemFn="onRemoveItemHandler"
    :inputBind="inputBind"
    :inputOn="inputOn"
    >
    </component>
    </template>
    <template v-else>
    <component 
    :is="dynamicComponent"
    :inputTotal="inputTotal"
    :field="mergeField"
    :required="required"
    :disabled="disabled"
    @removeInputItemFn="onRemoveItemHandler"
    :inputBind="inputBind"
    :inputOn="inputOn"
    >
    </component>
    </template>
    <InkFieldMessage v-if="mergeField.description" :descriptionText="mergeField.description"/>
    <template v-if="!singleFieldTypes.includes(mergeField.type)">
    <InkButton
      v-if="inputTotal < checkFieldMax"
      as="button"
      type="button"
      variant="txt"
      theme="outline-gray"
      size="md"
      class="tw-self-start"
      @click="onPushItem"
      :disabled="disabled"
    >
      <i class="far fa-plus tw-text-base"></i>
      {{ t('add') }}
    </InkButton>
    </template>
  </fieldset>
</template>