import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Application = sequelize.define(
  "Application",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    jobseeker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    resume_link: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    cover_letter: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "pending",
        "reviewed",
        "accepted",
        "rejected"
      ),
      defaultValue: "pending",
    },
  },
  {
    tableName: "applications",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["job_id", "jobseeker_id"],
      },
    ],
  }
);

export default Application;