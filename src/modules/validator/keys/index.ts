import { InjectionKey } from "vue";
import { ChildData } from "../types";

const CHILDREN: InjectionKey<Record<string, ChildData>> = Symbol("CHILDREN");

export default { CHILDREN };
