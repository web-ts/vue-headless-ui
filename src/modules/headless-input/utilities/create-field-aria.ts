import { InputState } from "../types";

export default function (id: string, state: InputState, errorMessage: string | null) {
  return {
    "aria-describedby": errorMessage && state === "ERROR" ? `${id}-error` : undefined,
    "aria-invalid": errorMessage && state === "ERROR" ? true : undefined
  };
}
