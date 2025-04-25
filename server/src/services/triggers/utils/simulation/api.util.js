const { default: axios } = require('axios');
const logger = require('../../../../config/logger.config');
const { convertObjectToCsvString } = require('./common.util');

/**
 * It takes a simulation request object, converts it to a comma separated string, and then sends it to
 * the trigger simulator middleware
 */
const triggerSimulation = async simulationRequest => {
  // pass the simulation request to trigger simulator middleware for further processing
  try {
    // convert object to comma separated string
    const kedro_pipeline_params = convertObjectToCsvString(simulationRequest);

    await axios.post(process.env.TRIGGERS_SIMULATION_DE_PIPELINE_URL, { kedro_pipeline_params });
  } catch (e) {
    logger.error('triggerSimulation middleware request:', e);
  }
};

module.exports = {
  triggerSimulation,
};
