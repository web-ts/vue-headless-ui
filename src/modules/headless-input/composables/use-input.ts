import randomString from "@/utilities/random-string";

import { useChildValidator } from "@/modules/validator";
import { InputState, PropTypes } from "../types";

export default function (props: PropTypes, emit: { (e: "update:modelValue", value: unknown): void }) {
  // Use the provided id otherwise generate a random one
  const inputId = props.id ? `${props.id}` : `input-${randomString()}`;
  // Use the provided name or generate one based on the id
  const inputName = props.name ? `${props.name}` : `${inputId}-name`;

  const inputValue = computed({
    get: () => props.modelValue,
    set: (val) => {
      emit("update:modelValue", val);
    }
  });

  const rules = computed(() => props.rules ?? []);

  const { bind, error, valid, touched, onBlur } = useChildValidator<unknown>(inputName, rules, props.modelValue);

  bind(inputValue);

  const state = computed<InputState>(() => {
    if (!touched.value) return "CLEAR";
    else return valid.value ? "VALID" : "ERROR";
  });

  return {
    inputValue,
    inputId,
    inputName,
    state,
    onBlur,
    error: computed(() => error.value)
  };
}
