<script lang="ts" setup>
import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";
import DropdownHelper from "./DropdownHelper.vue";

const showDropdown = injectDefined(keys.SHOW_DROPDOWN);
const items = injectDefined(keys.ITEMS);
</script>
<template>
  <div v-show="showDropdown" style="border: 1px solid black">
    <dropdown-helper v-for="(item, index) in items" :key="index" :index="index" :item="item">
      <slot></slot>
    </dropdown-helper>
  </div>
</template>
