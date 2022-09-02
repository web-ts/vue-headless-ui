import injectDefined from "@/utilities/inject-defined";
import { renderSlot } from "vue";
import keys from "../keys";

export default /* @__PURE__ */ defineComponent({
  name: "HInputLabel",
  setup(_props, { slots }) {
    const inputId = injectDefined(keys.INPUT_ID);
    const checkbox = injectDefined(keys.CHECKBOX);
    const radio = injectDefined(keys.RADIO);
    const index = inject(keys.INDEX, -1);
    const tag = computed(() => {
      // Regular input
      if (!checkbox.value && !radio.value) return "label";
      // We know it can be a checkbox/radio if it has an index
      if (index !== -1) return "label";

      // It's a group
      return "legend";
    });

    const id = computed(() => {
      if (!checkbox.value && !radio.value) return inputId;
      if (index !== -1) return `${inputId}_${index}`;

      return undefined;
    });

    return () =>
      h(
        tag.value,
        {
          for: id.value
        },
        renderSlot(slots, "default")
      );
  }
});
