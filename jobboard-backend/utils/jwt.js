import jwt from "jsonwebtoken";

console.log("JWT_SECRET =", process.env.JWT_SECRET);

export const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// const jwt = require('jsonwebtoken');

// function signToken(payload) {
//   return jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN || '7d',
//   });
// }

// function verifyToken(token) {
//   return jwt.verify(token, process.env.JWT_SECRET);
// }

// module.exports = { signToken, verifyToken };
