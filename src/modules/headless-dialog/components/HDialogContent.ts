import useDialogContent from "../composables/use-dialog-content";

export default /* @__PURE__ */ defineComponent({
  name: "HDialogContent",
  props: {
    htmlTag: { type: String, default: "div" }
  },
  setup(props, { slots }) {
    const { id, wrapper } = useDialogContent();

    return () =>
      h(props.htmlTag, { id: `${id.value}_content`, ref: wrapper, role: "document" }, slots.default && slots.default());
  }
});
