"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
process.chdir("../../");
require("dotenv").config();
exports.CONFIG = {
    DB_URL: process.env.DATABASE_URL,
};
console.log("DEBUGPRINT[1]: index.ts:3: CONFIG=", exports.CONFIG);
