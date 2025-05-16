<script setup lang="ts">
import '@/scss/component/_ink-form.scss';
import { InkVTooltip } from '@/components/ink-tooltip/Ink-tooltip';
import InkButton from '@/components/InkButton.vue';
import { t } from '@/helper/i18n';
import { defineAsyncComponent, computed, watch } from 'vue';
import type { FieldDataSharp } from '@/components/input/field-data-interface';
import { useFieldArray } from 'vee-validate';
import InkFieldMessage from '@/components/input/InkFieldMessage.vue';
import { fieldDefaultValue, checkFieldMax } from '@/components/input/input-default-value';
interface DraggableItemOrder {
    inputId: string;
    value: string | number | boolean | object;
  }
interface FieldProps {
  field: FieldDataSharp; // field require for attribute required calculate data
  disabled?: boolean; // for attribute disabled
  required?: boolean; // for attribute required
}

const props = withDefaults(defineProps<FieldProps>(), {
  field: () => (fieldDefaultValue('text')),
});

const componentMap = {
  text: defineAsyncComponent(() => import('@/components/input/InkText.vue')),
  url: defineAsyncComponent(() => import('@/components/input/InkUrl.vue')),
} as const;

type FieldType = keyof typeof componentMap;

const dynamicComponent = computed(() => {
  return componentMap[props.field.type as FieldType];
});


// 根據欄位類型返回對應的值類型 (邊做 input 的 .vue 邊測試這裡的 type 是否可行，會因應使用的套件而不同)
type GetFieldValueType<T extends FieldType> = 
  T extends 'text' | 'slug' | 'email' | 'url' | 'password' | 'time' | 'textarea' | 'html'
    ? string 
    : T extends 'number' | 'datetime'
    ? number 
    : T extends 'switch' 
    ? boolean 
    : T extends 'json'
    ? object 
    : T extends 'select' | 'checkbox' | 'radio' | 'hashtag'
    ? object | string
    : T extends 'file' | 'image'
    ? number | object
    : never;

// 使用 computed 來獲取當前的欄位類型
const fieldType = computed(() => props.field.type as FieldType);

// 使用 fieldType.value 來決定 useFieldArray 的類型
const { remove, push, fields, update, replace } = useFieldArray<GetFieldValueType<typeof fieldType.value>>(props.field.id);

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
    // case 'textarea':
    // case 'html':
      push('');
      break;
    default:
      push('');
      break;
  }
}

if(fields.value.length === 0) {
  onPushItem()
}

</script>

<template>
  <fieldset class="js-dynamic-component tw-flex tw-flex-col tw-flex-wrap tw-gap-2">
    <legend v-if="field.name" :class="['tw-mb-2 tw-text-base tw-font-semibold tw-flex tw-items-center tw-gap-1']">
      {{ field.name }}
      <InkVTooltip v-if="field.tip">
        <button type="button" class="tw-btn-transparent tw-btn-icon-xs"><i class="fa-regular fa-circle-info"></i></button>
        <template #popper>
          {{ field.tip }}
        </template>
      </InkVTooltip>
      <span v-if="required" class="tw-text-primary-500">
         {{ t('requiredHint') }}
      </span>
    </legend>
    <!-- <slot/> -->
    <component 
    v-for="(item, index) in fields"
    :key="`${item.key}-${index}`"
    :is="dynamicComponent"
    :index="index"
    :inputTotal="inputTotal"
    :field="field"
    :required="required"
    :disabled="disabled"
    @removeInputItemFn="onRemoveItemHandler"
    >
    </component>
    <InkFieldMessage v-if="field.description" :descriptionText="field.description"/>
    <InkButton
      v-if="inputTotal < checkFieldMax(field.max)"
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
  </fieldset>
</template>