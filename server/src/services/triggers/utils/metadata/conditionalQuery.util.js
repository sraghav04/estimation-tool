const { get } = require('lodash');
const { getRangeAttribute } = require('./rangeQuery.util');
const { getSanitizedAttribute } = require('./sanitizeQueryAttribute');

/**
 * It takes in a query string and returns a where clause object that can be used in a sequelize query
 * @param reqQueryString - The query string from the request.
 * @param sequelizeOp - This is the Sequelize operator that you want to use. For example, if you want
 * to use the AND operator, you would pass in Sequelize.Op.and.
 * @param Sequelize - The Sequelize instance
 * @returns A function that takes in a reqQueryString, sequelizeOp, and Sequelize and returns a
 * whereClause object.
 */
const getConditionalQueryClause = (reqQueryString, sequelizeOp, Sequelize) => {
  const brand = get(reqQueryString, 'brand');
  const sellingDivision = get(reqQueryString, 'sellingDivision');
  const cycleType = get(reqQueryString, 'cycleType');
  const minVolume = get(reqQueryString, 'minVolume');
  const maxVolume = get(reqQueryString, 'maxVolume');
  const owners = get(reqQueryString, 'owners');
  const channels = get(reqQueryString, 'channels');
  const isActive = get(reqQueryString, 'isActive', null);
  const searchBy = get(reqQueryString, 'searchBy');
  const channelClause = channels
    ? {
        [sequelizeOp.and]: Sequelize.literal(`channels && '{${channels}}'`),
      }
    : {};
  const ownerClause = owners
    ? {
        owner: {
          [sequelizeOp.in]: owners,
        },
      }
    : {};
  const isActiveClause = isActive ? { isActive: isActive === 'true' } : {};
  const isOnCycleClause = cycleType
    ? { isOnCycle: cycleType.toLowerCase() === 'On-Cycle'.toLowerCase() }
    : {};
  const baseWhereClause = {
    ...channelClause,
    ...ownerClause,
    ...isOnCycleClause,
    ...isActiveClause,
    ...getRangeAttribute(minVolume, maxVolume, 'volume', sequelizeOp),
    ...getSanitizedAttribute('brand', brand),
    ...getSanitizedAttribute('sellingDivision', sellingDivision),
  };

  let whereClause;
  if (searchBy && searchBy.length) {
    const safeSearchByStr = searchBy.replace(/\s\s+/g, ' ');
    const additionalSearchClause = {
      [sequelizeOp.or]: [
        {
          triggerName: {
            [sequelizeOp.iLike]: `%${searchBy}%`,
          },
        },
        {
          description: {
            [sequelizeOp.iLike]: `%${searchBy}%`,
          },
        },
        Sequelize.literal(`tags && '{${safeSearchByStr}}'`),
      ],
    };
    whereClause = {
      [sequelizeOp.and]: [baseWhereClause, additionalSearchClause],
    };
  } else {
    whereClause = baseWhereClause;
  }

  return whereClause;
};

module.exports = {
  getConditionalQueryClause,
};
