import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import keys from "../keys";
import createDefaultInputProps from "../utilities/create-default-input-props";

export default /* @__PURE__ */ defineComponent({
  name: "HSelectField",
  props: {
    placeholder: prop<string>(),
    valueKey: prop<string>("value"),
    labelKey: prop<string>("name")
  },
  setup(props) {
    const inputValue = injectDefined(keys.INPUT_VALUE);
    const inputId = injectDefined(keys.INPUT_ID);
    const inputName = injectDefined(keys.INPUT_NAME);
    const state = injectDefined(keys.STATE);
    const errorMessage = injectDefined(keys.ERROR_MESSAGE);
    const options = injectDefined(keys.OPTIONS);
    const onBlur = injectDefined(keys.ON_BLUR);

    return () =>
      h("select", createDefaultInputProps(inputId, inputName, inputValue, state, errorMessage, onBlur), [
        props.placeholder &&
          h("option", { value: null, disabled: true, hidden: true, selected: true }, props.placeholder),
        options.value.map((option, index) =>
          h("option", { key: index, value: option[props.valueKey] }, option[props.labelKey] as string)
        )
      ]);
  }
});
