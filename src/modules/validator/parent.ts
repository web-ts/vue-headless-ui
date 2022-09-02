import keys from "./keys";
import { ChildData } from "./types";

/**
 * Parent validator composable. Holds a reference to all children, and can validate all of them at one
 */
export function useParentValidator() {
  /**
   * Object containing references to all the child values.
   */
  const children = reactive<Record<string, ChildData>>({});

  /**
   * Validate all children currently subscribed to this parent.
   */
  async function validate() {
    let isValid = true;
    const childrenArray = Object.values(children);

    for (const child of childrenArray) {
      // eslint-disable-next-line no-await-in-loop
      const valid = await child.onBlur();

      if (!valid) {
        isValid = false;
      }
    }

    return isValid;
  }

  // Provide the parent array to all children.
  provide(keys.CHILDREN, children);

  return {
    validate,
    children
  };
}
