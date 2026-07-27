import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Job = sequelize.define(
  "Job",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    employer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },

    job_type: {
      type: DataTypes.ENUM(
        "full-time",
        "part-time",
        "contract",
        "internship",
        "remote"
      ),
      allowNull: false,
      defaultValue: "full-time",
    },

    salary_min: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    salary_max: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("open", "closed"),
      defaultValue: "open",
    },
  },
  {
    tableName: "jobs",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["status"],
      },
      {
        fields: ["location"],
      },
    ],
  }
);

export default Job;