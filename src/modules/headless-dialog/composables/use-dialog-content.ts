import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";
import { activeDialogs } from "./use-dialog";

const focusableElements =
  'button:not([disabled="true"]), a:not([disabled="true"]), input:not([disabled="true"]), select:not([disabled="true"]), textarea:not([disabled="true"]), [tabindex]:not([tabindex="-1"])';

export default function () {
  const wrapper = ref<HTMLElement | null>(null);

  const open = injectDefined(keys.OPEN);
  const id = injectDefined(keys.ID);

  let focusableContent: null | NodeListOf<HTMLElement> | undefined = null;

  function reloadDomArray() {
    focusableContent = wrapper.value ? wrapper.value.querySelectorAll<HTMLElement>(focusableElements) : null;

    if (focusableContent) {
      let shouldResetFocus = true;

      // If we are already focused on an element form this array we should not not reset the focus.
      for (let index = 0; index < focusableContent.length; index++) {
        if (document.activeElement === focusableContent[index]) {
          shouldResetFocus = false;
          break;
        }
      }
      if (focusableContent[0] && shouldResetFocus) {
        // Focus on the first available element
        focusableContent[0].focus();
      }
    }
  }

  const domObserver = new MutationObserver(reloadDomArray);

  function onKeyDown(event: KeyboardEvent) {
    // If the last active dialog is not this one or it's not open or it doesn't have focusable content we should not do anything.
    if (activeDialogs.value[activeDialogs.value.length - 1] !== id.value || !open.value || !focusableContent) return;

    const isTabPressed = event.key === "Tab";

    if (event.key === "Escape") open.value = false;

    if (!isTabPressed) return;

    if (event.shiftKey) {
      if (document.activeElement === focusableContent[0]) {
        focusableContent[focusableContent.length - 1].focus();
        event.preventDefault();
      }
    } else if (document.activeElement === focusableContent[focusableContent.length - 1]) {
      focusableContent[0].focus();
      event.preventDefault();
    }
  }

  onMounted(() => {
    document.addEventListener("keydown", onKeyDown);
    reloadDomArray();
    if (wrapper.value) {
      domObserver.observe(wrapper.value, { attributes: true, childList: true, subtree: true });
    } else {
      throw new Error("The content element is not mounted. This is probably an internal bug.");
    }
  });

  onBeforeUnmount(() => {
    if (wrapper.value) domObserver.disconnect();
    document.removeEventListener("keydown", onKeyDown);
  });

  return { id, wrapper };
}
