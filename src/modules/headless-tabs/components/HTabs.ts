import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import { renderSlot } from "vue";
import keys from "../keys";

export default defineComponent({
  name: "HTabs",
  props: {
    modelValue: prop<number>(0)
  },
  emits: {
    "update:modelValue": emit<number>()
  },
  setup(props, { slots, emit }) {
    const currentTab = computed({
      get: () => props.modelValue,
      set: (newVal) => emit("update:modelValue", newVal)
    });
    const tabs = ref<Array<string>>([]);
    const switches = ref<Array<string>>([]);

    function switchTab(index: number) {
      currentTab.value = index;
    }

    provide(keys.CURRENT_TAB, currentTab);
    provide(keys.TAB_ARRAY, tabs);
    provide(keys.SWITCH_ARRAY, switches);
    provide(keys.SWITCH_TAB, switchTab);

    return () => renderSlot(slots, "default", { currentTab: currentTab.value, switchTab });
  }
});
