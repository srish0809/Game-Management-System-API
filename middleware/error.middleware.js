const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || [];

  res.status(statusCode).json({ message, details });
};

module.exports = errorMiddleware;
