import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { signToken } from "../utils/jwt.js";
import { success, error } from "../utils/apiResponse.js";

// ===============================
// Register User
// POST /api/auth/register
// ===============================
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, company_name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return error(res, 409, "An account with this email already exists.");
    }

    // Hash Password
    const password_hash = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password_hash,
      role,
      company_name: role === "employer" ? company_name || null : null,
    });

    // Generate JWT
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return success(res, 201, "Account created successfully.", {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company_name: user.company_name,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ===============================
// Login User
// POST /api/auth/login
// ===============================
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return error(res, 401, "Invalid email or password.");
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return error(res, 401, "Invalid email or password.");
    }

    // Generate JWT
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return success(res, 200, "Logged in successfully.", {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company_name: user.company_name,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ===============================
// Get Logged-in User Profile
// GET /api/auth/me
// ===============================
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "name",
        "email",
        "role",
        "company_name",
        "created_at",
      ],
    });

    if (!user) {
      return error(res, 404, "User not found.");
    }

    return success(res, 200, "Profile fetched.", user);
  } catch (err) {
    next(err);
  }
};

// const bcrypt = require('bcryptjs');
// const { pool } = require('../config/db');
// const { signToken } = require('../utils/jwt');
// const { success, error } = require('../utils/apiResponse');

// // POST /api/auth/register
// async function register(req, res, next) {
//   try {
//     const { name, email, password, role, company_name } = req.body;

//     const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
//     if (existing.length > 0) {
//       return error(res, 409, 'An account with this email already exists.');
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const [result] = await pool.query(
//       `INSERT INTO users (name, email, password_hash, role, company_name)
//        VALUES (?, ?, ?, ?, ?)`,
//       [name, email, passwordHash, role, role === 'employer' ? company_name || null : null]
//     );

//     const token = signToken({ id: result.insertId, role, email });

//     return success(res, 201, 'Account created successfully.', {
//       token,
//       user: { id: result.insertId, name, email, role },
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// // POST /api/auth/login
// async function login(req, res, next) {
//   try {
//     const { email, password } = req.body;

//     const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (rows.length === 0) {
//       return error(res, 401, 'Invalid email or password.');
//     }

//     const user = rows[0];
//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch) {
//       return error(res, 401, 'Invalid email or password.');
//     }

//     const token = signToken({ id: user.id, role: user.role, email: user.email });

//     return success(res, 200, 'Logged in successfully.', {
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         company_name: user.company_name,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// // GET /api/auth/me
// async function getProfile(req, res, next) {
//   try {
//     const [rows] = await pool.query(
//       'SELECT id, name, email, role, company_name, created_at FROM users WHERE id = ?',
//       [req.user.id]
//     );
//     if (rows.length === 0) {
//       return error(res, 404, 'User not found.');
//     }
//     return success(res, 200, 'Profile fetched.', rows[0]);
//   } catch (err) {
//     next(err);
//   }
// }

// module.exports = { register, login, getProfile };
