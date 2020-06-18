const {
  NotFoundError,
  DataBaseError,
  InternalServerError,
} = require('../../Server/errors');

const handleError = (err, res) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
