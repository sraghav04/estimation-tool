const HttpException = require('../../errors/HttpException.error');
const db = require('../../models');

const MetadataService = require('../../services/triggers/metadata.service');

/**
 * It gets all the metadatas from the database
 * @param _req - The request object
 * @param res - The response object.
 * @param next - This is a function that you call when you're done with your middleware.
 */
const getMetadata = async (req, res, next) => {
  try {
    const metadataServiceInstance = new MetadataService(db);
    const data = await metadataServiceInstance.getMetadata(req.query);
    res.send(data);
  } catch (e) {
    next(new HttpException('INTERNAL_SERVER_ERROR', 'METADATA_INTERNAL_ERROR', e.message));
  }
  next();
};

/**
 * It hits a patch request for metadata
 * @param _req - The request object
 * @param res - The response object.
 * @param next - This is a function that you call when you're done with your middleware.
 */
const patchMetadata = async (req, res, next) => {
  try {
    const metadataServiceInstance = new MetadataService(db);
    const data = await metadataServiceInstance.patchMetadata(req.body);
    res.send(data);
  } catch (e) {
    next(new HttpException('INTERNAL_SERVER_ERROR', 'TRIGGERS_METADATA_INTERNAL_ERROR', e.message));
  }
  next();
};

module.exports = {
  getMetadata,
  patchMetadata,
};
