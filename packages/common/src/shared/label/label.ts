export type Label =
  | string
  | Label[]
  | LabelObject

  // required to prevent error "Type instantiation is excessively deep and possibly infinite."
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | any;

// using Record<> does not work because TS does not support recursive definitions
export interface LabelObject {
  [key: string]: Label;
}

export function labelAttribute(
  value: Label | LabelObject | undefined,
  defaultValue: Label | LabelObject = {}
): Label | LabelObject {
  const resolved = value ?? {};

  if (isLabelObject(resolved) && isLabelObject(defaultValue)) {
    return deepMerge(defaultValue as LabelObject, resolved as LabelObject);
  }

  return resolved;
}

function isLabelObject(value: unknown): value is LabelObject {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge(target: LabelObject, source: LabelObject): LabelObject {
  const output: LabelObject = { ...target };
  for (const key of Object.keys(source)) {
    if (isLabelObject(source[key]) && isLabelObject(target[key])) {
      output[key] = deepMerge(
        target[key] as LabelObject,
        source[key] as LabelObject
      );
    } else {
      output[key] = source[key];
    }
  }
  return output;
}
