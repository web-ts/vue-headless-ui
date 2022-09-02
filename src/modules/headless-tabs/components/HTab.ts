import useArrayLink from "@/composables/use-array-link";
import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import { renderSlot } from "vue";
import keys from "../keys";

export default defineComponent({
  name: "HTab",
  props: {
    htmlTag: prop<string>("div")
  },
  setup(props, { slots }) {
    const switches = injectDefined(keys.SWITCH_ARRAY);
    const tabs = injectDefined(keys.TAB_ARRAY);
    const currentTab = injectDefined(keys.CURRENT_TAB);

    const { id, index } = useArrayLink(tabs);

    const show = computed(() => index.value === currentTab.value);

    return () =>
      show.value &&
      h(
        props.htmlTag,
        { key: id.value, id: id.value, "aria-labelledby": switches.value[index.value], role: "tabpanel" },
        renderSlot(slots, "default", { currentTab: currentTab.value, tabIndex: index.value })
      );
  }
});
