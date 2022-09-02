import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";

export default /* @__PURE__ */ (name: string) =>
  defineComponent({
    name: `HDialog${name}`,
    props: {
      htmlTag: { type: String, default: "div" }
    },
    setup(props, { slots }) {
      const id = injectDefined(keys.ID);

      return () => h(props.htmlTag, { id: `${id.value}_${name.toLowerCase()}` }, slots.default && slots.default());
    }
  });
