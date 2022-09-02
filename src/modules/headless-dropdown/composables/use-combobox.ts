import keys from "../keys";

export default function (
  props: Readonly<{ modelValue: unknown; items: Array<{ label: unknown; value: unknown }> }>,
  emit: (e: "update:modelValue", value: unknown) => void
) {
  const showDropdown = ref(false);
  const activeDescendant = ref(0);
  const model = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit("update:modelValue", value);
    }
  });

  const items = computed(() => props.items);

  function show() {
    showDropdown.value = true;
  }

  function hide() {
    showDropdown.value = false;
  }

  function handleBoxVisibility(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key === "Escape" || showDropdown.value) {
      hide();
    } else {
      show();
    }
  }

  function updateActiveDescendant(isUp: boolean) {
    if (isUp && activeDescendant.value !== 0) {
      activeDescendant.value--;
    }
    if (!isUp && activeDescendant.value !== items.value.length - 1) {
      activeDescendant.value++;
    }
  }

  function onKeyPress(event: KeyboardEvent) {
    console.log(event.key);

    switch (event.key) {
      case "Enter":
      case "Escape":
        handleBoxVisibility(event);
        break;
      case "ArrowUp":
        updateActiveDescendant(true);
        break;
      case "ArrowDown":
        updateActiveDescendant(false);
        break;

      default:
        break;
    }
  }

  provide(keys.ON_KEY_PRESS, onKeyPress);
  provide(keys.SHOW_DROPDOWN, showDropdown);
  provide(keys.SHOW, show);
  provide(keys.HIDE, hide);
  provide(keys.MODEL, model);
  provide(keys.ITEMS, items);
  provide(keys.ACTIVE_DESCENDANT, activeDescendant);

  return {
    onKeyPress,
    showDropdown,
    show,
    hide,
    model,
    items,
    activeDescendant
  };
}
