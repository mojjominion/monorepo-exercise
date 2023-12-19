process.chdir("../../");
require("dotenv").config();

export const CONFIG = {
  DB_URL: process.env.DATABASE_URL,
};
