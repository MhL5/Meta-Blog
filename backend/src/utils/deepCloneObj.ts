import lodash from "lodash";

function makePropertiesEnumerable(obj: Error) {
  const propertyDescriptors = Object.getOwnPropertyDescriptors(obj);

  for (const key in propertyDescriptors)
    (propertyDescriptors[key] as PropertyDescriptor).enumerable = true;

  const newObj = Object.create(Object.getPrototypeOf(obj));
  Object.defineProperties(newObj, propertyDescriptors);

  return newObj;
}

export function cloneError(error: Error) {
  return lodash.clone(makePropertiesEnumerable(error));
}
