import { Op } from "sequelize";
import { Job, User } from "../models/index.js";
import { success, error } from "../utils/apiResponse.js";

// ===================================
// Create Job
// POST /api/jobs
// Employer Only
// ===================================
export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      job_type,
      salary_min,
      salary_max,
    } = req.body;

    const job = await Job.create({
      employer_id: req.user.id,
      title,
      description,
      location,
      job_type: job_type || "full-time",
      salary_min: salary_min || null,
      salary_max: salary_max || null,
    });

    return success(res, 201, "Job posted successfully.", {
      id: job.id,
    });
  } catch (err) {
    next(err);
  }
};

// ===================================
// Get All Jobs
// GET /api/jobs
// Public
// ===================================
export const listJobs = async (req, res, next) => {
  try {
    const {
      location,
      job_type,
      status = "open",
      page = 1,
      limit = 10,
    } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (location) {
      where.location = {
        [Op.like]: `%${location}%`,
      };
    }

    if (job_type) {
      where.job_type = job_type;
    }

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Job.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: "employer",
          attributes: ["id", "name", "company_name"],
        },
      ],
      order: [["created_at", "DESC"]],
      limit: Number(limit),
      offset,
    });

    return success(res, 200, "Jobs fetched.", {
      jobs: rows,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

// ===================================
// Get Single Job
// GET /api/jobs/:id
// ===================================
export const getJob = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "employer",
          attributes: ["id", "name", "company_name", "email"],
        },
      ],
    });

    if (!job) {
      return error(res, 404, "Job not found.");
    }

    return success(res, 200, "Job fetched.", job);
  } catch (err) {
    next(err);
  }
};

// ===================================
// Update Job
// PUT /api/jobs/:id
// Employer Only
// ===================================
export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return error(res, 404, "Job not found.");
    }

    if (job.employer_id !== req.user.id) {
      return error(
        res,
        403,
        "You can only edit your own job postings."
      );
    }

    await job.update(req.body);

    return success(res, 200, "Job updated successfully.", job);
  } catch (err) {
    next(err);
  }
};

// ===================================
// Delete Job
// DELETE /api/jobs/:id
// Employer Only
// ===================================
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return error(res, 404, "Job not found.");
    }

    if (job.employer_id !== req.user.id) {
      return error(
        res,
        403,
        "You can only delete your own job postings."
      );
    }

    await job.destroy();

    return success(res, 200, "Job deleted successfully.");
  } catch (err) {
    next(err);
  }
};

// ===================================
// Get Employer Jobs
// GET /api/jobs/mine/list
// Employer Only
// ===================================
export const listMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.findAll({
      where: {
        employer_id: req.user.id,
      },
      order: [["created_at", "DESC"]],
    });

    return success(res, 200, "Your jobs fetched.", jobs);
  } catch (err) {
    next(err);
  }
};

// const { pool } = require('../config/db');
// const { success, error } = require('../utils/apiResponse');

// // POST /api/jobs  (employer only)
// async function createJob(req, res, next) {
//   try {
//     const { title, description, location, job_type, salary_min, salary_max } = req.body;
//     const employerId = req.user.id;

//     const [result] = await pool.query(
//       `INSERT INTO jobs (employer_id, title, description, location, job_type, salary_min, salary_max)
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [employerId, title, description, location, job_type || 'full-time', salary_min || null, salary_max || null]
//     );

//     return success(res, 201, 'Job posted successfully.', { id: result.insertId });
//   } catch (err) {
//     next(err);
//   }
// }

// // GET /api/jobs  (public, with optional filters + pagination)
// async function listJobs(req, res, next) {
//   try {
//     const { location, job_type, status = 'open', page = 1, limit = 10 } = req.query;

//     const conditions = [];
//     const params = [];

//     if (status) {
//       conditions.push('j.status = ?');
//       params.push(status);
//     }
//     if (location) {
//       conditions.push('j.location LIKE ?');
//       params.push(`%${location}%`);
//     }
//     if (job_type) {
//       conditions.push('j.job_type = ?');
//       params.push(job_type);
//     }

//     const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
//     const offset = (Math.max(1, page) - 1) * limit;

//     const [rows] = await pool.query(
//       `SELECT j.*, u.name AS employer_name, u.company_name
//        FROM jobs j
//        JOIN users u ON u.id = j.employer_id
//        ${whereClause}
//        ORDER BY j.created_at DESC
//        LIMIT ? OFFSET ?`,
//       [...params, Number(limit), Number(offset)]
//     );

//     const [[{ total }]] = await pool.query(
//       `SELECT COUNT(*) AS total FROM jobs j ${whereClause}`,
//       params
//     );

//     return success(res, 200, 'Jobs fetched.', {
//       jobs: rows,
//       pagination: { total, page: Number(page), limit: Number(limit) },
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// // GET /api/jobs/:id
// async function getJob(req, res, next) {
//   try {
//     const [rows] = await pool.query(
//       `SELECT j.*, u.name AS employer_name, u.company_name
//        FROM jobs j
//        JOIN users u ON u.id = j.employer_id
//        WHERE j.id = ?`,
//       [req.params.id]
//     );

//     if (rows.length === 0) {
//       return error(res, 404, 'Job not found.');
//     }

//     return success(res, 200, 'Job fetched.', rows[0]);
//   } catch (err) {
//     next(err);
//   }
// }

// // PUT /api/jobs/:id  (owning employer only)
// async function updateJob(req, res, next) {
//   try {
//     const jobId = req.params.id;
//     const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [jobId]);

//     if (rows.length === 0) {
//       return error(res, 404, 'Job not found.');
//     }
//     if (rows[0].employer_id !== req.user.id) {
//       return error(res, 403, 'You can only edit your own job postings.');
//     }

//     const { title, description, location, job_type, salary_min, salary_max, status } = req.body;

//     await pool.query(
//       `UPDATE jobs SET
//         title = COALESCE(?, title),
//         description = COALESCE(?, description),
//         location = COALESCE(?, location),
//         job_type = COALESCE(?, job_type),
//         salary_min = COALESCE(?, salary_min),
//         salary_max = COALESCE(?, salary_max),
//         status = COALESCE(?, status)
//        WHERE id = ?`,
//       [title, description, location, job_type, salary_min, salary_max, status, jobId]
//     );

//     return success(res, 200, 'Job updated successfully.');
//   } catch (err) {
//     next(err);
//   }
// }

// // DELETE /api/jobs/:id  (owning employer only)
// async function deleteJob(req, res, next) {
//   try {
//     const jobId = req.params.id;
//     const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [jobId]);

//     if (rows.length === 0) {
//       return error(res, 404, 'Job not found.');
//     }
//     if (rows[0].employer_id !== req.user.id) {
//       return error(res, 403, 'You can only delete your own job postings.');
//     }

//     await pool.query('DELETE FROM jobs WHERE id = ?', [jobId]);
//     return success(res, 200, 'Job deleted successfully.');
//   } catch (err) {
//     next(err);
//   }
// }

// // GET /api/jobs/mine/list  (employer's own postings)
// async function listMyJobs(req, res, next) {
//   try {
//     const [rows] = await pool.query(
//       'SELECT * FROM jobs WHERE employer_id = ? ORDER BY created_at DESC',
//       [req.user.id]
//     );
//     return success(res, 200, 'Your jobs fetched.', rows);
//   } catch (err) {
//     next(err);
//   }
// }

// module.exports = { createJob, listJobs, getJob, updateJob, deleteJob, listMyJobs };
