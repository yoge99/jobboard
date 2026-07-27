import express from 'express';
import sequelize, { testConnection } from './config/db.js';
import app from './app.js';
import dotenv from 'dotenv';
import "./models/index.js"

dotenv.config();

const PORT = process.env.PORT || 5000;

async function start() {
   try {
    // Test database connection
    await testConnection();

    // Create/update tables
    await sequelize.sync({ alter: true });

    console.log("✅ Database synced successfully.");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
