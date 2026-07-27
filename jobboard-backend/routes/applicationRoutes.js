import express from "express";

import {
  listMyApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/mine",
  authenticate,
  authorize("jobseeker"),
  listMyApplications
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("employer"),
  updateApplicationStatus
);

export default router;

// const express = require('express');
// const router = express.Router();

// const {
//   listMyApplications,
//   updateApplicationStatus,
// } = require('../controllers/applicationController');

// const { authenticate, authorize } = require('../middleware/auth');

// router.get('/mine', authenticate, authorize('jobseeker'), listMyApplications);
// router.patch('/:id/status', authenticate, authorize('employer'), updateApplicationStatus);

// module.exports = router;
