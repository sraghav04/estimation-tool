/* 
  The HttpException class is a custom error class that extends the Error class
  It adds error type, module error key to it 
*/
class HttpException extends Error {
  constructor(errorType, moduleErrorKey, message) {
    super();
    this.errorType = errorType;
    this.moduleErrorKey = moduleErrorKey;
    this.message = message;
  }
}

module.exports = HttpException;
