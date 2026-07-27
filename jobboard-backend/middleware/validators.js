import { body, validationResult } from "express-validator";
import { error } from "../utils/apiResponse.js";

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return error(res, 422, "Validation failed.", errors.array());
  }

  next();
};

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required."),

  body("email")
    .isEmail()
    .withMessage("A valid email is required."),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),

  body("role")
    .isIn(["employer", "jobseeker"])
    .withMessage("Role must be employer or jobseeker."),

  handleValidation,
];

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("A valid email is required."),

  body("password")
    .notEmpty()
    .withMessage("Password is required."),

  handleValidation,
];

export const jobValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required."),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required."),

  body("job_type")
    .optional()
    .isIn([
      "full-time",
      "part-time",
      "contract",
      "internship",
      "remote",
    ])
    .withMessage("Invalid job type."),

  body("salary_min")
    .optional()
    .isInt({ min: 0 })
    .withMessage("salary_min must be a positive number."),

  body("salary_max")
    .optional()
    .isInt({ min: 0 })
    .withMessage("salary_max must be a positive number."),

  handleValidation,
];

export const applicationValidator = [
  body("resume_link")
    .trim()
    .notEmpty()
    .withMessage("Resume link is required."),

  body("cover_letter")
    .optional()
    .trim(),

  handleValidation,
];

// const { body, validationResult } = require('express-validator');
// const { error } = require('../utils/apiResponse');

// function handleValidation(req, res, next) {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return error(res, 422, 'Validation failed.', errors.array());
//   }
//   next();
// }

// const registerValidator = [
//   body('name').trim().notEmpty().withMessage('Name is required.'),
//   body('email').isEmail().withMessage('A valid email is required.'),
//   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
//   body('role').isIn(['employer', 'jobseeker']).withMessage('Role must be employer or jobseeker.'),
//   handleValidation,
// ];

// const loginValidator = [
//   body('email').isEmail().withMessage('A valid email is required.'),
//   body('password').notEmpty().withMessage('Password is required.'),
//   handleValidation,
// ];

// const jobValidator = [
//   body('title').trim().notEmpty().withMessage('Title is required.'),
//   body('description').trim().notEmpty().withMessage('Description is required.'),
//   body('location').trim().notEmpty().withMessage('Location is required.'),
//   body('job_type')
//     .optional()
//     .isIn(['full-time', 'part-time', 'contract', 'internship', 'remote'])
//     .withMessage('Invalid job type.'),
//   body('salary_min').optional().isInt({ min: 0 }).withMessage('salary_min must be a positive number.'),
//   body('salary_max').optional().isInt({ min: 0 }).withMessage('salary_max must be a positive number.'),
//   handleValidation,
// ];

// const applicationValidator = [
//   body('resume_link').trim().notEmpty().withMessage('Resume link is required.'),
//   body('cover_letter').optional().trim(),
//   handleValidation,
// ];

// module.exports = {
//   registerValidator,
//   loginValidator,
//   jobValidator,
//   applicationValidator,
// };
