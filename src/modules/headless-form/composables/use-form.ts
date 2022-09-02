import { useParentValidator } from "@/modules/validator";

export default function (emit: { (e: "submit-valid"): void; (e: "submit-error"): void }) {
  const { validate } = useParentValidator();

  async function submit(event: Event) {
    event.preventDefault();
    const isValid = await validate();

    if (isValid) emit("submit-valid");
    else emit("submit-error");
  }

  return {
    submit
  };
}
