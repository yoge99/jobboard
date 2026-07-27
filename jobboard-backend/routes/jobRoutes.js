
import express from "express";

import {
  createJob,
  listJobs,
  getJob,
  updateJob,
  deleteJob,
  listMyJobs,
} from "../controllers/jobController.js";

import {
  applyToJob,
  listApplicationsForJob,
} from "../controllers/applicationController.js";

import { authenticate, authorize } from "../middleware/auth.js";

import {
  jobValidator,
  applicationValidator,
} from "../middleware/validators.js";

const router = express.Router();

// =========================
// Public Routes
// =========================
router.get("/", listJobs);

router.get("/:id", getJob);

// =========================
// Employer Routes
// =========================
router.get(
  "/mine/list",
  authenticate,
  authorize("employer"),
  listMyJobs
);

router.post(
  "/",
  authenticate,
  authorize("employer"),
  jobValidator,
  createJob
);

router.put(
  "/:id",
  authenticate,
  authorize("employer"),
  updateJob
);

router.delete(
  "/:id",
  authenticate,
  authorize("employer"),
  deleteJob
);

// =========================
// Job Applications
// =========================
router.post(
  "/:jobId/applications",
  authenticate,
  authorize("jobseeker"),
  applicationValidator,
  applyToJob
);

router.get(
  "/:jobId/applications",
  authenticate,
  authorize("employer"),
  listApplicationsForJob
);

export default router;
// const express = require('express');
// const router = express.Router();

// const {
//   createJob,
//   listJobs,
//   getJob,
//   updateJob,
//   deleteJob,
//   listMyJobs,
// } = require('../controllers/jobController');

// const {
//   applyToJob,
//   listApplicationsForJob,
// } = require('../controllers/applicationController');

// const { authenticate, authorize } = require('../middleware/auth');
// const { jobValidator, applicationValidator } = require('../middleware/validators');

// // Public
// router.get('/', listJobs);

// // Employer-only: must come before /:id to avoid route collision
// router.get('/mine/list', authenticate, authorize('employer'), listMyJobs);

// router.get('/:id', getJob);

// router.post('/', authenticate, authorize('employer'), jobValidator, createJob);
// router.put('/:id', authenticate, authorize('employer'), updateJob);
// router.delete('/:id', authenticate, authorize('employer'), deleteJob);

// // Applications nested under a job
// router.post(
//   '/:jobId/applications',
//   authenticate,
//   authorize('jobseeker'),
//   applicationValidator,
//   applyToJob
// );
// router.get(
//   '/:jobId/applications',
//   authenticate,
//   authorize('employer'),
//   listApplicationsForJob
// );

// module.exports = router;
