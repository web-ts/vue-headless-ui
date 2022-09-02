import { ComputedRef, WritableComputedRef } from "vue";
import { InputState } from "../types";
import createFieldAria from "./create-field-aria";

/**
 * Common render props for all input field components
 */
export default function (
  inputId: string,
  inputName: string,
  inputValue: WritableComputedRef<unknown>,
  state: ComputedRef<InputState>,
  errorMessage: ComputedRef<string | null>,
  onBlur: () => void
) {
  return {
    id: inputId,
    name: inputName,
    value: inputValue.value,
    ...createFieldAria(inputId, state.value, errorMessage.value),
    onInput: (e: InputEvent) => {
      inputValue.value = (e.target as HTMLInputElement | HTMLTextAreaElement).value;
    },
    onBlur
  };
}
