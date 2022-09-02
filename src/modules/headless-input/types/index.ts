export type Rule = (value: unknown) => boolean | string;
export interface PropTypes {
  id?: string;
  name?: string;
  modelValue?: unknown;
  options?: Array<Record<string, unknown>>;
  rules?: Array<Rule>;
  radio: boolean | string;
  checkbox: boolean | string;
  textarea: boolean | string;
}

export type InputState = "CLEAR" | "VALID" | "ERROR";
