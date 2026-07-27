import { Application, Job, User } from "../models/index.js";
import { success, error } from "../utils/apiResponse.js";

// ===================================
// Apply to a Job
// POST /api/jobs/:jobId/applications
// Jobseeker Only
// ===================================
export const applyToJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { resume_link, cover_letter } = req.body;

    // Check if job exists
    const job = await Job.findByPk(jobId);

    if (!job) {
      return error(res, 404, "Job not found.");
    }

    if (job.status !== "open") {
      return error(
        res,
        400,
        "This job is no longer accepting applications."
      );
    }

    // Check duplicate application
    const existingApplication = await Application.findOne({
      where: {
        job_id: jobId,
        jobseeker_id: req.user.id,
      },
    });

    if (existingApplication) {
      return error(
        res,
        409,
        "You have already applied to this job."
      );
    }

    const application = await Application.create({
      job_id: jobId,
      jobseeker_id: req.user.id,
      resume_link,
      cover_letter: cover_letter || null,
    });

    return success(
      res,
      201,
      "Application submitted successfully.",
      {
        id: application.id,
      }
    );
  } catch (err) {
    next(err);
  }
};

// ===================================
// List Applications for a Job
// GET /api/jobs/:jobId/applications
// Employer Only
// ===================================
export const listApplicationsForJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);

    if (!job) {
      return error(res, 404, "Job not found.");
    }

    if (job.employer_id !== req.user.id) {
      return error(
        res,
        403,
        "You can only view applications for your own job postings."
      );
    }

    const applications = await Application.findAll({
      where: {
        job_id: jobId,
      },
      include: [
        {
          model: User,
          as: "jobseeker",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return success(
      res,
      200,
      "Applications fetched.",
      applications
    );
  } catch (err) {
    next(err);
  }
};

// ===================================
// My Applications
// GET /api/applications/mine
// Jobseeker Only
// ===================================
export const listMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.findAll({
      where: {
        jobseeker_id: req.user.id,
      },
      include: [
        {
          model: Job,
          as: "job",
          include: [
            {
              model: User,
              as: "employer",
              attributes: ["id", "name", "company_name"],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return success(
      res,
      200,
      "Your applications fetched.",
      applications
    );
  } catch (err) {
    next(err);
  }
};

// ===================================
// Update Application Status
// PATCH /api/applications/:id/status
// Employer Only
// ===================================
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "reviewed",
      "accepted",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return error(
        res,
        422,
        `Status must be one of: ${allowedStatuses.join(", ")}`
      );
    }

    const application = await Application.findByPk(id, {
      include: [
        {
          model: Job,
          as: "job",
        },
      ],
    });

    if (!application) {
      return error(res, 404, "Application not found.");
    }

    if (application.job.employer_id !== req.user.id) {
      return error(
        res,
        403,
        "You can only manage applications for your own job postings."
      );
    }

    application.status = status;
    await application.save();

    return success(
      res,
      200,
      "Application status updated.",
      application
    );
  } catch (err) {
    next(err);
  }
};

// const { pool } = require('../config/db');
// const { success, error } = require('../utils/apiResponse');

// // POST /api/jobs/:jobId/applications  (jobseeker only)
// async function applyToJob(req, res, next) {
//   try {
//     const { jobId } = req.params;
//     const { resume_link, cover_letter } = req.body;
//     const jobseekerId = req.user.id;

//     const [jobs] = await pool.query('SELECT * FROM jobs WHERE id = ?', [jobId]);
//     if (jobs.length === 0) {
//       return error(res, 404, 'Job not found.');
//     }
//     if (jobs[0].status !== 'open') {
//       return error(res, 400, 'This job is no longer accepting applications.');
//     }

//     const [result] = await pool.query(
//       `INSERT INTO applications (job_id, jobseeker_id, resume_link, cover_letter)
//        VALUES (?, ?, ?, ?)`,
//       [jobId, jobseekerId, resume_link, cover_letter || null]
//     );

//     return success(res, 201, 'Application submitted successfully.', { id: result.insertId });
//   } catch (err) {
//     if (err.code === 'ER_DUP_ENTRY') {
//       return error(res, 409, 'You have already applied to this job.');
//     }
//     next(err);
//   }
// }

// // GET /api/jobs/:jobId/applications  (owning employer only)
// async function listApplicationsForJob(req, res, next) {
//   try {
//     const { jobId } = req.params;

//     const [jobs] = await pool.query('SELECT * FROM jobs WHERE id = ?', [jobId]);
//     if (jobs.length === 0) {
//       return error(res, 404, 'Job not found.');
//     }
//     if (jobs[0].employer_id !== req.user.id) {
//       return error(res, 403, 'You can only view applications for your own job postings.');
//     }

//     const [rows] = await pool.query(
//       `SELECT a.*, u.name AS applicant_name, u.email AS applicant_email
//        FROM applications a
//        JOIN users u ON u.id = a.jobseeker_id
//        WHERE a.job_id = ?
//        ORDER BY a.created_at DESC`,
//       [jobId]
//     );

//     return success(res, 200, 'Applications fetched.', rows);
//   } catch (err) {
//     next(err);
//   }
// }

// // GET /api/applications/mine  (jobseeker's own applications)
// async function listMyApplications(req, res, next) {
//   try {
//     const [rows] = await pool.query(
//       `SELECT a.*, j.title AS job_title, j.location, u.company_name
//        FROM applications a
//        JOIN jobs j ON j.id = a.job_id
//        JOIN users u ON u.id = j.employer_id
//        WHERE a.jobseeker_id = ?
//        ORDER BY a.created_at DESC`,
//       [req.user.id]
//     );
//     return success(res, 200, 'Your applications fetched.', rows);
//   } catch (err) {
//     next(err);
//   }
// }

// // PATCH /api/applications/:id/status  (owning employer only)
// async function updateApplicationStatus(req, res, next) {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const allowedStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
//     if (!allowedStatuses.includes(status)) {
//       return error(res, 422, `Status must be one of: ${allowedStatuses.join(', ')}`);
//     }

//     const [rows] = await pool.query(
//       `SELECT a.*, j.employer_id
//        FROM applications a
//        JOIN jobs j ON j.id = a.job_id
//        WHERE a.id = ?`,
//       [id]
//     );

//     if (rows.length === 0) {
//       return error(res, 404, 'Application not found.');
//     }
//     if (rows[0].employer_id !== req.user.id) {
//       return error(res, 403, 'You can only manage applications for your own job postings.');
//     }

//     await pool.query('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
//     return success(res, 200, 'Application status updated.');
//   } catch (err) {
//     next(err);
//   }
// }

// module.exports = {
//   applyToJob,
//   listApplicationsForJob,
//   listMyApplications,
//   updateApplicationStatus,
// };
