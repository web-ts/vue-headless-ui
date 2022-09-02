import { ComputedRef, InjectionKey, WritableComputedRef } from "vue";
import { InputState } from "../types";

const INPUT_VALUE: InjectionKey<WritableComputedRef<unknown>> = Symbol("INPUT_VALUE");
const ERROR_MESSAGE: InjectionKey<ComputedRef<string | null>> = Symbol("ERROR_MESSAGE");
const INPUT_ID: InjectionKey<string> = Symbol("INPUT_ID");
const INPUT_NAME: InjectionKey<string> = Symbol("INPUT_NAME");
const TEXTAREA: InjectionKey<ComputedRef<boolean>> = Symbol("TEXTAREA");
const RADIO: InjectionKey<ComputedRef<boolean>> = Symbol("RADIO");
const CHECKBOX: InjectionKey<ComputedRef<boolean>> = Symbol("CHECKBOX");
const ON_BLUR: InjectionKey<() => void> = Symbol("ON_BLUR");
const STATE: InjectionKey<ComputedRef<InputState>> = Symbol("STATE");
const OPTIONS: InjectionKey<ComputedRef<Array<Record<string, unknown>>>> = Symbol("OPTIONS");
const OPTION: InjectionKey<ComputedRef<Record<string, unknown>>> = Symbol("OPTION");
const INDEX: InjectionKey<number> = Symbol("INDEX");

export default Object.freeze({
  INPUT_VALUE,
  ERROR_MESSAGE,
  INPUT_ID,
  INPUT_NAME,
  TEXTAREA,
  RADIO,
  CHECKBOX,
  ON_BLUR,
  STATE,
  OPTIONS,
  OPTION,
  INDEX
});
