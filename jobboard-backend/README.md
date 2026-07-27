# Job Board API — Backend (Stage 1)

REST API for a Job Board application. Employers post jobs, jobseekers apply.
Built with **Express.js**, **Node.js**, and **MySQL**.

> This is Stage 1 of the project (backend only). Frontend, CI/CD, deployment,
> and full documentation come in later stages.

## Tech Stack
- Node.js + Express
- MySQL (via `mysql2`)
- JWT authentication (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Input validation (`express-validator`)
- Security headers (`helmet`), logging (`morgan`), CORS

## Project Structure
```
jobboard-backend/
├── app.js                 # Express app setup
├── server.js               # Entry point
├── config/db.js            # MySQL connection pool
├── models/
│   ├── schema.sql          # DB schema
│   └── migrate.js          # Migration runner
├── controllers/            # Business logic
├── routes/                 # API route definitions
├── middleware/              # Auth, validation, error handling
├── utils/                   # JWT + response helpers
└── .env.example
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
   Then fill in your MySQL credentials and a JWT secret.

3. Create the database and tables:
   ```bash
   npm run migrate
   ```
   (or run `models/schema.sql` manually against your MySQL server)

4. Start the server:
   ```bash
   npm run dev   # with nodemon
   # or
   npm start
   ```

Server runs at `http://localhost:5000` by default.

## API Overview

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register as employer or jobseeker |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Authenticated | Get current user profile |

### Jobs
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/jobs` | Public | List/filter jobs (location, job_type, status, pagination) |
| GET | `/api/jobs/:id` | Public | Get a single job |
| GET | `/api/jobs/mine/list` | Employer | List own postings |
| POST | `/api/jobs` | Employer | Create a job |
| PUT | `/api/jobs/:id` | Employer (owner) | Update a job |
| DELETE | `/api/jobs/:id` | Employer (owner) | Delete a job |

### Applications
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/jobs/:jobId/applications` | Jobseeker | Apply to a job |
| GET | `/api/jobs/:jobId/applications` | Employer (owner) | View applicants for a job |
| GET | `/api/applications/mine` | Jobseeker | View own applications |
| PATCH | `/api/applications/:id/status` | Employer (owner) | Update application status |

### Health
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server health check |

## Notes
- All protected routes require `Authorization: Bearer <token>`.
- Roles: `employer`, `jobseeker` — enforced via middleware.
- Full documentation (Postman collection, architecture diagram, deployment
  guide) will be added in Stage 5.
