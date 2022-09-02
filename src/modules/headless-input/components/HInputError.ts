import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import { renderSlot } from "vue";
import keys from "../keys";

export default /* @__PURE__ */ defineComponent({
  name: "HInputError",
  props: {
    htmlTag: prop<string>("div")
  },
  setup(props, { slots }) {
    const error = injectDefined(keys.ERROR_MESSAGE);
    const state = injectDefined(keys.STATE);
    const inputId = injectDefined(keys.INPUT_ID);

    return () =>
      error.value &&
      state.value === "ERROR" &&
      h(
        props.htmlTag,
        { id: `${inputId}-error`, "data-error": true },
        renderSlot(slots, "default", { error: error.value }, () => [error.value])
      );
  }
});
