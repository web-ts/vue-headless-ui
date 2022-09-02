import prop from "@/utilities/prop";
import { renderSlot } from "vue";
import keys from "../../keys";

export default /* @__PURE__ */ defineComponent({
  name: "HBoxProvider",
  props: {
    index: prop<number>(),
    option: prop<Record<string, unknown>>(),
    htmlTag: prop<string>("div")
  },
  setup(props, { slots }) {
    provide(keys.INDEX, props.index);
    provide(
      keys.OPTION,
      computed(() => props.option)
    );

    return () => h(props.htmlTag, {}, renderSlot(slots, "default"));
  }
});
