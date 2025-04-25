/**
 * It takes in a minimum and maximum value, a key name, and a sequelize operator, and returns an object
 * that can be used in a sequelize query
 * @param min - The minimum value of the range
 * @param max - the maximum value of the range
 * @param keyName - The name of the key in the object that will be returned.
 * @param sequelizeOp - This is the sequelize operator that you want to use. For example, if you want
 * to use the greater than or equal to operator, you would pass in the sequelizeOp as Op.gte.
 * @returns An object with a key of keyName and a value of an object with a key of sequelizeOp.between
 * or sequelizeOp.gte or sequelizeOp.lte and a value of an array of min and max or min or max.
 */
const getRangeAttribute = (min, max, keyName, sequelizeOp) => {
  if (min && max) {
    return {
      [keyName]: {
        [sequelizeOp.between]: [min, max],
      },
    };
  } else if (min && !max) {
    return {
      [keyName]: {
        [sequelizeOp.gte]: min,
      },
    };
  } else if (!min && max) {
    return {
      [keyName]: {
        [sequelizeOp.lte]: max,
      },
    };
  } else {
    return {};
  }
};

module.exports = {
  getRangeAttribute,
};
