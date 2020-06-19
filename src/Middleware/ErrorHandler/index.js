const {
  NotFoundError,
  DataBaseError,
  InternalServerError,
} = require('../../Server/errors');

const errorHandler = (err, req, res, next) => {
  const { name = InternalServerError.name } = err;
  let status, message;

  switch (name) {
    case NotFoundError.name:
    case DataBaseError.name:
      message = err.message;
      status = err.status;
      break;
    default:
      message = err.message ? err.message : InternalServerError.message;
      status = InternalServerError.status;
      break;
  }

  res.status(status).json({
    message,
  });
};

module.exports = {
  errorHandler,
};
