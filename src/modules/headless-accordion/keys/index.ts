import type { InjectionKey, WritableComputedRef, ComputedRef } from "vue";

const ID: InjectionKey<ComputedRef<string>> = Symbol("ID");
const OPEN: InjectionKey<WritableComputedRef<boolean>> = Symbol("OPEN");
const TOGGLE_ACCORDION: InjectionKey<() => void> = Symbol("TOGGLE_ACCORDION");

export default Object.freeze({
  ID,
  OPEN,
  TOGGLE_ACCORDION
});
