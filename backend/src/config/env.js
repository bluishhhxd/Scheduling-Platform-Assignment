import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  databaseUrl:
    process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/scheduling_platform",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000"
};
