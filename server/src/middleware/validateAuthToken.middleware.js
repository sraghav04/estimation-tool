const logger = require('../config/logger.config');
const HttpException = require('../errors/HttpException.error');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { BEARER_TOKEN_TYPE } = require('../constants/app.constant');
const client = jwksClient({
  jwksUri: 'https://login.microsoftonline.com/3ac94b33-9135-4821-9502-eafda6592a35/discovery/v2.0/keys',
  rateLimit: true,
  jwksRequestsPerMinute: 10,
  timeout: 30000,
})
/**
 * It decodes the JWT token and adds the decoded token to the request object
 * @param req - The request object
 * @param _res - The response object.
 * @param next - This is a callback function that is called when the middleware is complete.
 */
const validateAuthToken = async (req, _res, next) => {
  
  try {
    const authToken = req.headers?.authorization;
    const [tokenType, token] = authToken.split(' ') ?? [];
    const kid = jwt.decode(token, { complete: true }).header.kid
    const key = await client.getSigningKey(kid)
    const signingKey = key.getPublicKey()

    if (!authToken) {
      next(new HttpException('UNAUTHORIZED', 'USER_ACCESS_TOKEN_MISSING', 'Missing Token'));
      return;
    }
    if (tokenType.toLowerCase() === BEARER_TOKEN_TYPE.toLowerCase() && token) {
      const verified = jwt.verify(token, signingKey, { algorithm: 'RS256' })
      const username = verified.preferred_username.toLowerCase();
      req.username = username;
      next();
      return;
    }
    next(new HttpException('UNAUTHORIZED', 'USER_ACCESS_TOKEN_INVALID', 'Invalid Token'));
  } catch (error) {
    logger.error('Error in decoding token:', error);
    next(new HttpException('UNAUTHORIZED', 'USER_ACCESS_TOKEN_INVALID', 'Invalid Token'));
  }
};

module.exports = validateAuthToken;
