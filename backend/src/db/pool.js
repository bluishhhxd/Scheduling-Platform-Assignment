import pg from "pg";
import { env } from "../config/env.js";

const { Pool } = pg;

const isHostedDatabase = env.databaseUrl.includes("sslmode=require") || env.databaseUrl.includes("neon.tech");

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: isHostedDatabase
    ? {
        rejectUnauthorized: false
      }
    : false
});
