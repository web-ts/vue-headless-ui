<script lang="ts" setup>

import { PropType } from "vue";
import useCombobox from "../composables/use-combobox";

const props = defineProps({
  id: {
    type: String,
    default: undefined
  },
  modelValue: {
    type: String,
    default: null
  },
  items: {
    type: Array as PropType<Array<{ label: unknown; value: unknown }>>,
    required: true
  }
});

const emit = defineEmits<(e: "update:modelValue", value: unknown) => void>();

const { onKeyPress, showDropdown, show, hide, model, activeDescendant } = useCombobox(props, emit);

const value = ref(null);
</script>
<template>
  <slot></slot>
</template>
