import injectDefined from "@/utilities/inject-defined";
import { ComputedRef, Ref, WritableComputedRef } from "vue";
import keys from "./keys";
import { ValidationModes, ChildData } from "./types";
import { getGlobalValidationMode } from "./validation-modes";

export function useChildValidator<T>(
  name: string,
  rules: ComputedRef<Array<(value: T) => boolean | string | Promise<string | boolean>>>,
  defaultValue: T | undefined = undefined
) {
  const children = injectDefined(keys.CHILDREN);

  /**
   * Internal state of the validator
   */
  const internalState = ref(defaultValue) as Ref<T>;

  /**
   * Touched attribute. A validator is touched if the internal state has been changed / it has been interacted with.
   */
  const touched = ref(defaultValue ? true : false);
  const valid = ref(true);
  const error = ref<null | string>(null);

  function bind(value: Ref<T> | ComputedRef<T> | WritableComputedRef<T>) {
    watch(value, (newValue) => {
      if (getGlobalValidationMode() === ValidationModes.AGGRESSIVE) touched.value = true;
      internalState.value = newValue;
    });
  }

  async function validate(mode?: ValidationModes) {
    error.value = null;
    const validationMode = mode ?? getGlobalValidationMode();

    if (!touched.value && validationMode === ValidationModes.LAZY) {
      return true;
    }
    for (const rule of rules.value) {
      // We need to wait for each rule to be resolved
      // eslint-disable-next-line no-await-in-loop
      const result = await rule(internalState.value);

      if (typeof result === "string") {
        error.value = result;

        return false;
      }
    }

    return true;
  }

  // Validate on state change or rule change
  watch([internalState, rules], async () => {
    valid.value = await validate();
  });

  onBeforeUnmount(() => {
    if (children[name]) delete children[name];
  });

  async function onBlur() {
    touched.value = true;
    valid.value = await validate();

    return valid.value;
  }

  // Validate it on creation in case the value is already set and the field is touched
  (async () => {
    valid.value = await validate();
  })();

  // Register the validator to the parent validator
  if (!children[name]) {
    // ref() inside reactive() becomes unwrapped so we have to cast the type
    children[name] = {
      value: internalState,
      valid,
      touched,
      error,
      onBlur
    } as unknown as ChildData;
  }

  return {
    bind,
    onBlur,
    valid,
    touched,
    error,
    internalState
  };
}
