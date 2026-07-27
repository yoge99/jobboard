import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Security & Parsing Middleware
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Job Board API is running.",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;


// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');

// const authRoutes = require('./routes/authRoutes');
// const jobRoutes = require('./routes/jobRoutes');
// const applicationRoutes = require('./routes/applicationRoutes');
// const { notFound, errorHandler } = require('./middleware/errorHandler');

// const app = express();

// // Security & parsing middleware
// app.use(helmet());
// app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// if (process.env.NODE_ENV !== 'test') {
//   app.use(morgan('dev'));
// }

// // Health check (useful for Vercel / uptime checks)
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ success: true, message: 'Job Board API is running.' });
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/applications', applicationRoutes);

// // 404 + error handling
// app.use(notFound);
// app.use(errorHandler);

// module.exports = app;
