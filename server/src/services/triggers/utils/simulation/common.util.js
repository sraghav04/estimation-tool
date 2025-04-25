/**
 * It takes an object and returns a string of the form "field1:value1,field2:value2,field3:value3"
 * @returns A string of the form:
 *   field1:value1,field2:value2,field3:value3
 */
const convertObjectToCsvString = request => {
  return Object.keys(request).reduce((accumulator, field) => {
    const previousValue = accumulator ? `${accumulator},` : '';
    const currentValue = `${field}:${request[field]}`;
    return previousValue + currentValue;
  }, '');
};

module.exports = {
  convertObjectToCsvString,
};
