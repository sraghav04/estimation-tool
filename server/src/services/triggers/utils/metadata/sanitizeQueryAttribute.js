/**
 * It returns an object with a key of the value of the first argument and a value of the second
 * argument, unless the second argument is falsy, in which case it returns an empty object
 * @param keyName - The name of the attribute you want to add to the object.
 * @param value - The value of the attribute.
 * @returns An object with a key of keyName and a value of value.
 */
const getSanitizedAttribute = (keyName, value) => {
  return value
    ? {
        [keyName]: value,
      }
    : {};
};

module.exports = {
  getSanitizedAttribute,
};
