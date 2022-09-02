import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import keys from "../keys";
import createFieldAria from "../utilities/create-field-aria";

export default /* @__PURE__ */ defineComponent({
  name: "HBoxField",
  props: {
    valueKey: prop<string>("value"),
    nameKey: prop<string>("name")
  },
  setup(props) {
    const inputValue = injectDefined(keys.INPUT_VALUE);
    const inputId = injectDefined(keys.INPUT_ID);
    const inputName = injectDefined(keys.INPUT_NAME);
    const checkbox = injectDefined(keys.CHECKBOX);
    const radio = injectDefined(keys.RADIO);
    const state = injectDefined(keys.STATE);
    const errorMessage = injectDefined(keys.ERROR_MESSAGE);
    const option = injectDefined(keys.OPTION);
    const index = injectDefined(keys.INDEX);
    const onBlur = injectDefined(keys.ON_BLUR);

    const type = computed(() => {
      if (checkbox.value) return "checkbox";
      if (radio.value) return "radio";
      throw new Error("No input type specified, please specify either checkbox or radio");
    });

    function onCheckboxInput(inputEvent: InputEvent) {
      const value = (inputEvent.target as HTMLInputElement).value;

      if (Array.isArray(inputValue.value)) {
        if (inputValue.value.includes(value))
          inputValue.value = inputValue.value.filter((element) => element !== value);
        else inputValue.value.push(value);
      } else {
        inputValue.value = [value];
      }
    }

    function onRadioInput(inputEvent: InputEvent) {
      inputValue.value = (inputEvent.target as HTMLInputElement).value;
    }

    const isSelected = computed(() => {
      if (type.value === "checkbox")
        return Array.isArray(inputValue.value) && inputValue.value.includes(option.value[props.valueKey]);

      return inputValue.value === option.value[props.valueKey];
    });

    return () =>
      h("input", {
        type: type.value,
        id: `${inputId}_${index}`,
        name: inputName,
        checked: isSelected.value,
        value: option.value[props.valueKey],
        ...createFieldAria(inputId, state.value, errorMessage.value),
        onInput: type.value === "radio" ? onRadioInput : onCheckboxInput,
        onBlur
      });
  }
});
