import express from "express";

import {
  register,
  login,
  getProfile,
} from "../controllers/authController.js";

import {
  registerValidator,
  loginValidator,
} from "../middleware/validators.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

router.get("/me", authenticate, getProfile);

export default router;

// const express = require('express');
// const router = express.Router();

// const { register, login, getProfile } = require('../controllers/authController');
// const { registerValidator, loginValidator } = require('../middleware/validators');
// const { authenticate } = require('../middleware/auth');

// router.post('/register', registerValidator, register);
// router.post('/login', loginValidator, login);
// router.get('/me', authenticate, getProfile);

// module.exports = router;
