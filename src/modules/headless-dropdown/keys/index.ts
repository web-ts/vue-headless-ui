import type { InjectionKey, Ref, ComputedRef, WritableComputedRef } from "vue";

const ID: InjectionKey<ComputedRef<string>> = Symbol("ID");
const ON_KEY_PRESS: InjectionKey<(event: KeyboardEvent) => void> = Symbol("ON_KEY_PRESS");
const SHOW_DROPDOWN: InjectionKey<Ref<boolean>> = Symbol("SHOW_DROPDOWN");
const SHOW: InjectionKey<() => void> = Symbol("SHOW");
const HIDE: InjectionKey<() => void> = Symbol("HIDE");
const MODEL: InjectionKey<WritableComputedRef<unknown>> = Symbol("MODEL");
const ITEMS: InjectionKey<ComputedRef<Array<{ label: unknown; value: unknown }>>> = Symbol("ITEMS");
const ACTIVE_DESCENDANT: InjectionKey<Ref<number>> = Symbol("ACTIVE_DESCENDANT");
const INDEX: InjectionKey<ComputedRef<number>> = Symbol("INDEX");
const ITEM: InjectionKey<ComputedRef<{ label: any; value: any }>> = Symbol("ITEM");

export default Object.freeze({
  ID,
  ON_KEY_PRESS,
  SHOW_DROPDOWN,
  SHOW,
  HIDE,
  MODEL,
  ITEMS,
  ACTIVE_DESCENDANT,
  INDEX,
  ITEM
});
