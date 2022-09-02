<script lang="ts" setup>
import { PropType } from "vue";
import keys from "../keys";
const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  item: {
    type: Object as PropType<{ label: unknown; value: unknown }>,
    required: true
  }
});

const index = computed(() => props.index);
const item = computed(() => props.item);

provide(keys.INDEX, index);
provide(keys.ITEM, item);

</script>
<template>
  <slot></slot>
</template>
