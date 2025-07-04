<script setup lang="ts">
import '@/scss/component/vue-select/_ink-vue-select.scss';
import { computed, defineEmits, onMounted, type PropType, toRef, watch, useTemplateRef } from 'vue';
import vSelect from 'vue-select'
import { useField } from 'vee-validate';
import InputWrapper from '@/components/input/InputWrapper.vue';
import InputInner from '@/components/input/InputInner.vue';
import InkErrorMessage from '@/components/input/InkErrorMessage.vue';
import InputFrame from '@/components/input/InputFrame.vue';
import { defaultInputProps, useMergeFieldProps, useMergeHashtagInputBind } from '@/components/input/input-default-value';
import { t } from '@/helper/i18n';
import type { HashtagInputBind, UnKnownOptions, HashtagSharp } from '@/components/input/field-data-interface';
const props = defineProps({
  ...defaultInputProps,
  field: {
    type: Object as PropType<HashtagSharp>,
    required: true,
  },
  inputBind: {
    type: Object as PropType<HashtagInputBind>,
    default: () => ({}),
  },
});
const emit = defineEmits(['removeInputItemFn']);

const {mergeField, checkFieldMax} = useMergeFieldProps<HashtagSharp>('hashtag', toRef(props, 'field'));
const { mergeInputBind, clearInputBind } = useMergeHashtagInputBind(toRef(props, 'inputBind'));


const rules = computed(() => ({
  required: props.required,
  itemLimit: [mergeField.value.min, mergeField.value.max],
}));

const { value, errorMessage, setValue } = useField<UnKnownOptions[]>(`${mergeField.value.id}`, rules);

// style
const elStyle = computed(() => {
  return {
    'active': mergeInputBind.value.activeStyle && value.value,
    'is-error': errorMessage.value,
  };
});

// const deleteSelectItemIsEmpty = ()=>{
//   if(value.value.length === 0)return;
//   value.value = value.value.filter((item: UnKnownOptions) => item);
// }
onMounted(() => {
  // deleteSelectItemIsEmpty();
});
const vSelectRef = useTemplateRef<InstanceType<typeof vSelect>>('vSelectRef');
watch(value, () => {
  vSelectRef.value?.searchEl.focus();
})
const createOption = (newOption: UnKnownOptions) => {
  // console.log('createOption',newOption, value.value);
  if (typeof newOption === 'string') {
    const existsTag = (clearInputBind.value.options as HashtagInputBind['options'] || []).find((item: UnKnownOptions) => { 
      return item[clearInputBind.value.label as string] === newOption;
    })
    if (existsTag) return existsTag;

    return {[clearInputBind.value.label as string]: newOption}
  }
  return newOption;
}

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
        ref="vSelectRef"
        v-model="value"
        :disabled="disabled"
        :required="required"
        :placeholder="mergeField.placeholder"
        class="tw-w-full"
        :class="elStyle"
        :inputId="`${mergeField.id}`"
        v-bind="clearInputBind"
        v-on="inputOn"
        :taggable="!mergeField.limit"
        :filterable="mergeField.limit"
        multiple
        :createOption="createOption"
        >
          <!-- 選項內容 -->
          <template #option="options">
            <div :class="['option']">
              <span 
              class="tw-mr-2.5 tw-rounded-sm tw-py-1"
              >
                {{ options[clearInputBind?.label as string] }}
              </span>
            </div>
          </template>
          <!-- 鎖定時不顯示刪除按鈕 -->
          <template v-if="disabled" #selected-option-container="{ option }">
            <div class="vs__selected">{{ option[clearInputBind?.label as string] }}</div>
          </template>

          <!-- 無選項內容 -->
          <template #no-options>
            {{ t('noResultsFound') }}
          </template>
          <template #open-indicator="{ attributes }">
            <!-- 自定義圖示或完全空白 -->
            {{ null }}
          </template>
          <template #list-footer>
        </template>
        </v-select>
      </InputFrame>
    </InputInner>
    <InkErrorMessage v-if="errorMessage" :errorText="errorMessage"/>
  </InputWrapper>
</template>