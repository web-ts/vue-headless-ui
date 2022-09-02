import emit from "@/utilities/emit";
import injectDefined from "@/utilities/inject-defined";
import { renderSlot } from "vue";
import keys from "../keys";

export default defineComponent({
  name: "HTabSwitch",
  inheritAttrs: false,
  emits: {
    click: emit<MouseEvent>(),
    keydown: emit<KeyboardEvent>()
  },
  setup(_props, { slots, attrs, emit }) {
    const tabs = injectDefined(keys.TAB_ARRAY);
    const currentTab = injectDefined(keys.CURRENT_TAB);
    const switchTab = injectDefined(keys.SWITCH_TAB);

    /**
     * Switch the tab and also focus on the active button
     */
    function switchAndFocus(value: number) {
      switchTab(value);
      // Focus on the next tab
      document.getElementById(`${tabs.value[value]}_switch`)?.focus();
    }

    function onKeydown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowRight":
          if (currentTab.value + 1 <= tabs.value.length - 1) {
            switchAndFocus(currentTab.value + 1);
          } else {
            switchAndFocus(0);
          }
          break;
        case "ArrowLeft":
          if (currentTab.value - 1 >= 0) {
            switchAndFocus(currentTab.value - 1);
          } else {
            switchAndFocus(tabs.value.length - 1);
          }
          break;
        case "Home":
          switchAndFocus(0);
          break;
        case "End":
          switchAndFocus(tabs.value.length - 1);
          break;
      }
      emit("keydown", e);
    }

    return () =>
      tabs.value.map((_tab, index) =>
        h(
          "button",
          {
            key: index,
            ...attrs,
            id: `${tabs.value[index]}_switch`,
            onClick: (e: MouseEvent) => {
              emit("click", e);
              switchTab(index);
            },
            onKeydown,
            type: "button",
            role: "tab",
            tabindex: index !== currentTab.value ? -1 : undefined,
            "aria-controls": tabs.value[index],
            "aria-selected": index === currentTab.value
          },
          renderSlot(slots, "default", { index })
        )
      );
  }
});
