/**
 * It returns a clause for a Sequelize query that filters triggers by whether they are active or not
 * @param isActive - true or false
 * @param simConfigActiveTriggerNames - An array of trigger names that are active in the simulation
 * configuration.
 * @param sequelizeOp - This is the sequelize operator object.
 */
const getTrigrNameClauseByIsActive = (isActive, simConfigActiveTriggerNames, sequelizeOp) => {
  switch (isActive) {
    case 'true':
      return {
        triggerName: { [sequelizeOp.in]: simConfigActiveTriggerNames },
      };
    case 'false':
      return {
        triggerName: { [sequelizeOp.notIn]: simConfigActiveTriggerNames },
      };
    default:
      return {};
  }
};

module.exports = {
  getTrigrNameClauseByIsActive,
};
