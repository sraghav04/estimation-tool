/**
 * It returns an object that can be used as a filter for a Sequelize query
 * @param keyName - The name of the key you want to filter by.
 * @param sequelizeOp - This is the sequelize operator that you want to use.
 */
const getFiltersQuery = (keyName, sequelizeOp) => ({
  [sequelizeOp.Op.and]: [
    {
      [keyName]: {
        [sequelizeOp.Op.ne]: '',
      },
    },
    {
      [keyName]: {
        [sequelizeOp.Op.ne]: null,
      },
    },
  ],
});

module.exports = {
  getFiltersQuery,
};
