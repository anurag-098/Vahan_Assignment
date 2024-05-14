import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// PostgreSQL configuration
const dbConfig = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

export default dbConfig;
