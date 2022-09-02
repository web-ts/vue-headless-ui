import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";
import createDefaultInputProps from "../utilities/create-default-input-props";

export default /* @__PURE__ */ defineComponent({
  name: "HTextField",
  setup() {
    const inputValue = injectDefined(keys.INPUT_VALUE);
    const inputId = injectDefined(keys.INPUT_ID);
    const inputName = injectDefined(keys.INPUT_NAME);
    const textarea = injectDefined(keys.TEXTAREA);
    const state = injectDefined(keys.STATE);
    const errorMessage = injectDefined(keys.ERROR_MESSAGE);
    const onBlur = injectDefined(keys.ON_BLUR);

    return () =>
      h(
        textarea.value ? "textarea" : "input",
        createDefaultInputProps(inputId, inputName, inputValue, state, errorMessage, onBlur)
      );
  }
});
