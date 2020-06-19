class ValidationError extends Error {
  name;
  status;
  message;

  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.message = message;
    this.status = 400;
  }
}

class NotFoundError extends Error {
  name;
  status;
  message;

  constructor() {
    super();
    this.name = 'NotFoundError';
    this.message = 'Not Found';
    this.status = 404;
  }
}

class InternalServerError extends Error {
  name;
  status;
  message;

  constructor() {
    super();
    this.name = 'InternalServerError';
    this.message = 'Internal Server Error';
    this.status = 500;
  }
}

class DataBaseError extends Error {
  name;
  status;
  message;

  constructor() {
    super();
    this.name = 'DataBaseError';
    this.message = 'Internal Server Error';
    this.status = 500;
  }
}

module.exports = {
  NotFoundError,
  DataBaseError,
  InternalServerError,
};
