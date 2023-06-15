const AppError = require("./../utils/appError");
const logger = require("./../utils/logger");
const handleCastError23505 = () =>
  new AppError("Duplicate field value: please use another value", 400);
const sendErrorDev = (err, res) => {
  logger.info(err);
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    messege: err.messege,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  logger.info(err);
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      messege: err.messenge,
    });
  } else {
    return res.status(500).json({
      status: "fail",
      messenge: "Something went very wrong!",
    });
  }
};
const globalErrorHandler = (err, req, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    let error = err;

    if (error.parent.code === "23505") error = handleCastError23505();

    sendErrorProd(error, res);
  }
};
module.exports = globalErrorHandler;
