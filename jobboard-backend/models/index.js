import User from "./User.js";
import Job from "./Job.js";
import Application from "./Application.js";

// =========================
// User (Employer) -> Jobs
// =========================
User.hasMany(Job, {
  foreignKey: "employer_id",
  as: "postedJobs",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Job.belongsTo(User, {
  foreignKey: "employer_id",
  as: "employer",
});

// =========================
// Job -> Applications
// =========================
Job.hasMany(Application, {
  foreignKey: "job_id",
  as: "applications",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Application.belongsTo(Job, {
  foreignKey: "job_id",
  as: "job",
});

// =========================
// User (Jobseeker) -> Applications
// =========================
User.hasMany(Application, {
  foreignKey: "jobseeker_id",
  as: "jobApplications",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Application.belongsTo(User, {
  foreignKey: "jobseeker_id",
  as: "jobseeker",
});

// =========================
// Many-to-Many (Optional but Useful)
// A Jobseeker can apply to many Jobs,
// and a Job can have many Jobseekers.
// =========================
User.belongsToMany(Job, {
  through: Application,
  foreignKey: "jobseeker_id",
  otherKey: "job_id",
  as: "appliedJobs",
});

Job.belongsToMany(User, {
  through: Application,
  foreignKey: "job_id",
  otherKey: "jobseeker_id",
  as: "applicants",
});

export { User, Job, Application };


// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
