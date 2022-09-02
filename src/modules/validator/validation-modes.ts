import { ValidationModes } from "./types";

let globalValidationMode: ValidationModes = ValidationModes.LAZY;

export function getGlobalValidationMode() {
  return globalValidationMode;
}

export function setGlobalValidationMode(mode: ValidationModes) {
  globalValidationMode = mode;
}
