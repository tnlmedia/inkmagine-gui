<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed } from 'vue';

const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number],
    default: '1',
  },
  name: {
    type: String,
    required: true,
  },
  modelError: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelError']);

const rules = computed(() => ({
  required: props.required,
}));

const { handleChange, checked, errorMessage } = useField( props.name, rules, {
  type: 'checkbox',
  checkedValue: props.value,
});

// 直接更新父組件的 error
if (errorMessage.value !== props.modelError) {
  emit('update:modelError', errorMessage.value);
}
</script>

<template>
   <input 
            type="checkbox" 
            class="form-check-input tw-peer"
            :checked="checked"
            :name="name"
            @change="handleChange"
            :value="value"
            :disabled="disabled"
            /><i :class="['tw-check', { 'tw-border-danger-400': errorMessage }]"></i><slot/>
</template>