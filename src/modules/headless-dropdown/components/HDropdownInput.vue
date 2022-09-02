<script lang="ts" setup>
import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";

const onKeyPress = injectDefined(keys.ON_KEY_PRESS);
const showDropdown = injectDefined(keys.SHOW_DROPDOWN);
const show = injectDefined(keys.SHOW);
const hide = injectDefined(keys.HIDE);
const model = injectDefined(keys.MODEL);
</script>
<template>
  <input
    v-model="model"
    role="combobox"
    :aria-expanded="showDropdown"
    tabindex="0"
    @keydown="onKeyPress"
    @focus="show"
    @blur="hide"
  />
</template>
