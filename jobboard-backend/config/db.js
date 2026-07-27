import  {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'jobboard',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
  }
);

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected successfully.');
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
  }
}

export default sequelize;

// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   port: process.env.DB_PORT || 3306,
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'jobboard',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   timezone: 'Z',
// });

// // Quick sanity check on boot
// async function testConnection() {
//   try {
//     const conn = await pool.getConnection();
//     console.log('✅ MySQL connected successfully.');
//     conn.release();
//   } catch (err) {
//     console.error('❌ MySQL connection failed:', err.message);
//   }
// }

// module.exports = { pool, testConnection };
