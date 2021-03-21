class CustomError {
  statusCode;
  message;

  constructor(status, message) {
    this.statusCode = status;
    this.message = message;
  }
}

module.exports = CustomError;
