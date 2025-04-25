/**
 * It takes in a request and a response, and sends back a string saying "Healthy!"
 * @param _req - The request object.
 * @param res - The response object.
 */
const healthCheck = (_req, res) => {
  res.send('Healthy!!');
};

module.exports = {
  healthCheck,
};
