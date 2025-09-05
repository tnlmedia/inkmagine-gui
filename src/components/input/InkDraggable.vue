<script setup lang="ts">
import draggable from 'vuedraggable';
import { computed } from 'vue';

interface DraggableItemOrder {
    inputId: string;
    value: string | number | boolean | object;
  }
interface DraggableProps {
  // itemKey: string;
  modelValue: DraggableItemOrder[];
  tag?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<DraggableProps>(), {
  // itemKey: '',
  tag: 'div',
});

const emit = defineEmits(['endGaggableHandler']);

</script>
<template>
  <draggable
    :list="modelValue"
    :animation="200"
    draggable=".js-draggable-item"
    :disabled="disabled"
    item-key="inputId"
    :tag="tag"
    class="draggable"
    @end="emit('endGaggableHandler', modelValue)"
  >
    <template #item="{ element:itemOrder, index:itemOrderIndex }">
      <div class="js-draggable-item tw-flex tw-items-center tw-gap-2">
        <i 
        class="fa-regular fa-grip-vertical tw-cursor-move tw-p-2 tw-text-sm"
        >
        </i>
        <slot name="item" :element="itemOrder" :index="itemOrderIndex"/>
      </div>
    </template>
  </draggable>
</template>
