import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import { renderSlot } from "vue";
import keys from "../keys";

export default /* @__PURE__ */ defineComponent({
  name: "HAccordionToggle",
  inheritAttrs: false,
  props: {
    htmlTag: prop<string>("button")
  },
  setup(props, { slots, attrs }) {
    const accordionId = injectDefined(keys.ID);
    const open = injectDefined(keys.OPEN);
    const toggleAccordion = injectDefined(keys.TOGGLE_ACCORDION);
    const componentId = computed(() => `${accordionId.value}_toggle`);

    return () =>
      renderSlot(slots, "wrapper", {}, () => [
        h(
          props.htmlTag,
          {
            ...attrs,
            id: componentId.value,
            "aria-controls": open.value ? accordionId.value : undefined,
            "aria-expanded": open.value,
            onClick: () => toggleAccordion()
          },
          renderSlot(slots, "default")
        )
      ]);
  }
});
