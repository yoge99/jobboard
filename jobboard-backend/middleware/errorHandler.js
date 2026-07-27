import { error } from "../utils/apiResponse.js";

// 404 Handler
export const notFound = (req, res, next) => {
  return error(
    res,
    404,
    `Route not found: ${req.method} ${req.originalUrl}`
  );
};

// Global Error Handler
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err);

  // Sequelize Unique Constraint Error
  if (err.name === "SequelizeUniqueConstraintError") {
    return error(res, 409, "Duplicate entry. This record already exists.");
  }

  // Sequelize Validation Error
  if (err.name === "SequelizeValidationError") {
    return error(
      res,
      422,
      err.errors.map((e) => e.message).join(", ")
    );
  }

  const statusCode = err.statusCode || 500;

  return error(
    res,
    statusCode,
    err.message || "Internal server error."
  );
};
// const { error } = require('../utils/apiResponse');

// function notFound(req, res, next) {
//   return error(res, 404, `Route not found: ${req.method} ${req.originalUrl}`);
// }

// // eslint-disable-next-line no-unused-vars
// function errorHandler(err, req, res, next) {
//   console.error(err.stack || err);

//   // MySQL duplicate entry
//   if (err.code === 'ER_DUP_ENTRY') {
//     return error(res, 409, 'Duplicate entry. This record already exists.');
//   }

//   const statusCode = err.statusCode || 500;
//   return error(res, statusCode, err.message || 'Internal server error.');
// }

// module.exports = { notFound, errorHandler };
