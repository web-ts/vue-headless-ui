import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import { TransitionPropsAndEvents } from "@/utilities/transition-types";
import { renderSlot, StyleValue, Teleport, Transition } from "vue";
import useDialog from "../composables/use-dialog";
import keys from "../keys";

export default /* @__PURE__ */ defineComponent({
  name: "HDialog",
  inheritAttrs: false,
  props: {
    id: prop<string>(),
    zIndex: prop<number>(100),
    modelValue: prop<boolean>(),
    fullScreen: prop<boolean>(true),
    style: prop<StyleValue>(),
    transition: prop<Partial<TransitionPropsAndEvents>>(() => ({}))
  },
  emits: {
    "update:modelValue": emit<boolean>()
  },
  setup(props, { slots, emit, attrs }) {
    const height = ref(window.innerHeight);

    function updateHeight() {
      height.value = window.innerHeight;
    }

    onMounted(() => {
      window.addEventListener("resize", updateHeight);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateHeight);
    });

    const { open, dialogId } = useDialog(props, emit);

    const style = computed(() => [
      props.style,
      props.fullScreen && {
        top: 0,
        left: 0,
        position: "fixed",
        width: "100vw",
        height: `${height.value}px`,
        zIndex: props.zIndex
      }
    ]);

    provide(keys.ID, dialogId);
    provide(keys.OPEN, open);

    return () =>
      h(
        Teleport,
        { to: "body" },
        h(
          Transition,
          props.transition,
          () =>
            open.value &&
            h(
              "div",
              {
                ...attrs,
                id: dialogId.value,
                style: style.value,
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": `${dialogId.value}_title`,
                "aria-describedby": `${dialogId.value}_description`
              },
              renderSlot(slots, "default")
            )
        )
      );
  }
});
