import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import { renderSlot } from "vue";
import keys from "../keys";

export default /* @__PURE__ */ defineComponent({
  name: "HAccordionContent",
  props: {
    htmlTag: prop<string>("div")
  },
  setup(_props, { slots }) {
    const open = injectDefined(keys.OPEN);
    const accordionId = injectDefined(keys.ID);

    return () =>
      open.value &&
      h(
        "div",
        {
          id: accordionId.value,
          role: "region",
          "aria-labelledby": `${accordionId.value}_toggle`
        },
        renderSlot(slots, "default")
      );
  }
});
