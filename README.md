# 🚀 Job Board Application

A full-stack Job Board web application built using **React + Vite**, **Node.js**, **Express.js**, **MySQL**, and **Sequelize ORM**. The application enables employers to post and manage jobs while allowing job seekers to browse jobs and apply online.

---

## 📌 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Role Based Authorization
- Employer
- Job Seeker

---

### Employer Features

- Create Job
- Update Job
- Delete Job
- View My Jobs
- View Applications for a Job
- Accept Application
- Reject Application
- Review Application

---

### Job Seeker Features

- Register/Login
- Browse Jobs
- View Job Details
- Apply to Jobs
- Upload Resume Link
- Add Cover Letter
- View My Applications
- Track Application Status

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- Express Validator
- Bcrypt

---

## 📁 Project Structure

```
jobboard
│
├── jobboard-backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── app.js
│   └── server.js
│
├── jobboard-frontend
│   ├── src
│   │
│   ├── components
│   ├── pages
│   ├── services
│   ├── context
│   └── App.jsx
│
└── .github
    └── workflows
        ├── backend.yml
        └── frontend.yml
```

---

## 🔐 Authentication

Authentication is implemented using JWT.

Protected routes require:

```
Authorization: Bearer <TOKEN>
```

---

## 📚 REST APIs

### Authentication

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Jobs

```
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
GET    /api/jobs/mine/list
```

### Applications

```
POST  /api/jobs/:jobId/applications
GET   /api/jobs/:jobId/applications
GET   /api/applications/mine
PATCH /api/applications/:id/status
```

---

## 🗄 Database

Main Tables

- Users
- Jobs
- Applications

Relationships

```
User
  |
  |---< Jobs

User
  |
  |---< Applications

Job
  |
  |---< Applications
```

---

## ⚙ Environment Variables

Backend

```
PORT=5000

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=
JWT_EXPIRES_IN=7d

CLIENT_ORIGIN=
```

Frontend

```
VITE_API_URL=
```

---

## ▶ Running Locally

### Backend

```
cd jobboard-backend

npm install

npm run dev
```

---

### Frontend

```
cd jobboard-frontend

npm install

npm run dev
```

---

## 🔄 CI/CD

GitHub Actions workflows are configured for:

Frontend

- Install dependencies
- Build application

Backend

- Install dependencies
- Verify backend builds successfully

Every push to the **main** branch automatically triggers the workflow.

---

## ☁ Deployment

Frontend

- Vercel

Backend

- Render

Database

- MySQL

---

## 📷 Application Workflow

Employer

```
Register/Login
      │
      ▼
Create Job
      │
      ▼
View Applications
      │
      ▼
Accept / Reject Candidate
```

Job Seeker

```
Register/Login
      │
      ▼
Browse Jobs
      │
      ▼
Apply
      │
      ▼
Track Status
```

---

## ✅ Project Highlights

- JWT Authentication
- Role Based Access
- RESTful APIs
- Sequelize ORM
- Responsive UI
- Tailwind CSS
- CI/CD using GitHub Actions
- Deployment using Vercel & Render

---
