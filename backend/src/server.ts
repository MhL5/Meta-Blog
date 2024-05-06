/**
 * This module configures the environment variables, sets up the database connection,
 * and initializes the Express application.
 *
 * @module MainApplicationSetup
 */

import { colorCodedConsoleLog } from "./utils/purpleConsoleLog";

/**
 * global synchronous code bug handler
 * this function should be place before synchronous code executions otherwise it can not catch all the errors
 */
process.on("uncaughtException", (err) => {
  colorCodedConsoleLog("fail", ` ⚠️ UNHANDLED EXCEPTION💥... SHUTTING DOWN ⚠️`);
  colorCodedConsoleLog("fail", ` ERROR:`, err.name, err.message);

  // un clean state exit immediately
  process.exit(1);
});

// Imports
////////////////////////////
import dotenv from "dotenv";
// Load environment variables from the specified file. should be at top level after importing dotenv
dotenv.config({ path: "./config.env" });

import mongoose from "mongoose";
import app from "./app";
import { env } from "./utils/env";
import { connectDB } from "../config/connectDB";
import { IncomingMessage, Server, ServerResponse } from "http";

const port = env.PORT || 3000;

let server: Server<typeof IncomingMessage, typeof ServerResponse> | null = null;
connectDB();
mongoose.connection.once("open", () => {
  colorCodedConsoleLog("success", "Connected to MongoDB 🚀");

  server = app.listen(port, () => {
    colorCodedConsoleLog(
      `success`,
      `App running in ${env.NODE_ENV.toUpperCase()} on localhost:${port}... `
    );
  });
});

/**
 * Any promise that we don't handle will be catched here
 * it should be before all of code executions
 * */
process.on("unhandledRejection", (err) => {
  colorCodedConsoleLog(
    "fail",
    " ⚠️ UNHANDLED REJECTION💥... SHUTTING DOWN ⚠️ "
  );

  if (err instanceof Error)
    colorCodedConsoleLog("fail", ` unhandledRejection:`, err.name, err.message);
  else colorCodedConsoleLog("fail", ` unhandledRejection: unknown error `);

  server?.close(() => process.exit(1));
});
