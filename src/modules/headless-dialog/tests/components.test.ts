import { afterEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { HDialog, HDialogContent, HDialogTitle, HDialogDescription } from "../";

document.body.innerHTML = '<div id="app"></div>';

const dialog = defineComponent({
  props: {
    openByDefault: { type: Boolean, default: false }
  },
  setup(props) {
    const open = ref(props.openByDefault);

    function updateOpen(value: boolean) {
      open.value = value;
    }

    return () => [
      h("div", {}, h("button", { id: "open", onClick: () => updateOpen(!open.value) }, "Open Dialog")),
      h(HDialog, { id: "fixed_id", modelValue: open.value, "onUpdate:modelValue": (value) => updateOpen(value) }, () =>
        h(HDialogContent, {}, () => [
          h(HDialogTitle, { htmlTag: "h1" }, () => "dialog_title"),
          h(HDialogDescription, { htmlTag: "p" }, () => "dialog_description")
        ])
      )
    ];
  }
});

describe("dialog", () => {
  afterEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
  });

  it("should be open by default", () => {
    mount(dialog, {
      props: { openByDefault: true },
      attachTo: document.getElementById("app") ?? document.body
    });

    expect(document.body.innerText).toMatchSnapshot();
  });

  it("should be closed by default", () => {
    mount(dialog, {
      props: { openByDefault: false },
      attachTo: document.getElementById("app") ?? document.body
    });
    expect(document.body.innerText).toMatchSnapshot();
  });

  it("should open", async () => {
    const wrapper = mount(dialog, { attachTo: document.getElementById("app") ?? document.body });

    wrapper.find("button").trigger("click");

    await nextTick();

    expect(document.body.innerText).toMatchSnapshot();
  });

  it("should close", async () => {
    const wrapper = mount(dialog, {
      props: { openByDefault: true },
      attachTo: document.getElementById("app") ?? document.body
    });

    wrapper.find("button").trigger("click");

    await nextTick();

    expect(document.body.innerText).toMatchSnapshot();
  });

  it("should trap the focus", async () => {
    //
  });

  it("should have aria description and title", async () => {
    //
  });
});
