<script lang="ts" setup>
import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";

const item = injectDefined(keys.ITEM);
const index = injectDefined(keys.INDEX);
</script>
<template>
  <div>
    <slot :index="index" :item="item"></slot>
  </div>
</template>
