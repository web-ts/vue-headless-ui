import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import { renderSlot } from "vue";
import keys from "../../keys";
import HBoxProvider from "./HBoxProvider";

export default /* @__PURE__ */ defineComponent({
  name: "HBoxWrapper",
  props: {
    htmlTag: prop<string>("div")
  },
  setup(props, { slots }) {
    const options = injectDefined(keys.OPTIONS);

    return () =>
      options.value.map((option, key) =>
        h(HBoxProvider, { key, option, htmlTag: props.htmlTag, index: key }, () =>
          renderSlot(slots, "default", { option })
        )
      );
  }
});
