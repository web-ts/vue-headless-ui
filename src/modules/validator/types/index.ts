export enum ValidationModes {
  LAZY = "LAZY",
  AGGRESSIVE = "AGGRESSIVE"
}

export interface ChildData {
  value: unknown;
  valid: boolean;
  touched: boolean;
  error: string | null;
  onBlur: () => boolean | Promise<boolean>;
}
