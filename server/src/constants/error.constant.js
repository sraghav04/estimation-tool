/* This is a list of error codes that can be used to send back to the client. */
const httpErrors = {
  /* Unhandled errors */
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal Server Error',
    errorGroup: '101',
  },
  SEQUELIZE_DATABASE_ERROR: {
    status: 500,
    message: 'Internal Server Error',
    errorGroup: '105',
  },
  /* Unauthorized errors */
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized',
    errorGroup: '102',
  },
  /* Invalid requests */
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
    errorGroup: '103',
  },
  /* Request not found */
  RESOURCE_NOT_FOUND: {
    status: 404,
    message: 'Resource not found',
    errorGroup: '106',
  },
};

module.exports = {
  httpErrors,
};
