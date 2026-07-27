import { verifyToken } from "../utils/jwt.js";
import { error } from "../utils/apiResponse.js";

/**
 * Verify JWT Token
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return error(res, 401, "Authentication token missing.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    // { id, email, role }
    req.user = decoded;

    next();
  } catch (err) {
    return error(res, 401, "Invalid or expired token.");
  }
};

/**
 * Role Authorization
 * Example:
 * authorize("employer")
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return error(
        res,
        403,
        "You do not have permission to perform this action."
      );
    }

    next();
  };
};

// const { verifyToken } = require('../utils/jwt');
// const { error } = require('../utils/apiResponse');

// /**
//  * Verifies the JWT from the Authorization header and attaches
//  * the decoded user payload to req.user.
//  */
// function authenticate(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return error(res, 401, 'Authentication token missing.');
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = verifyToken(token);
//     req.user = decoded; // { id, role, email }
//     next();
//   } catch (err) {
//     return error(res, 401, 'Invalid or expired token.');
//   }
// }

// /**
//  * Restricts route access to specific roles.
//  * Usage: authorize('employer')
//  */
// function authorize(...allowedRoles) {
//   return (req, res, next) => {
//     if (!req.user || !allowedRoles.includes(req.user.role)) {
//       return error(res, 403, 'You do not have permission to perform this action.');
//     }
//     next();
//   };
// }

// module.exports = { authenticate, authorize };
