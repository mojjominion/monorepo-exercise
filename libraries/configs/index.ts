import { config } from "dotenv";
import path from "path";

process.chdir(path.join(__dirname, ".."));
config();

export const CONFIG = {
  DB_URL: process.env.DATABASE_URL,
};
