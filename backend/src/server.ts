/**
 * This module configures the environment variables, sets up the database connection,
 * and initializes the Express application.
 *
 * @module MainApplicationSetup
 */

/**
 * global synchronous code bug handler
 * this function should be place before synchronous code executions otherwise it can not catch all the errors
 */
process.on("uncaughtException", (err) => {
  const purple = "\x1b[35m";
  console.log(`${purple} ⚠️ UNHANDLED EXCEPTION💥... SHUTTING DOWN ⚠️`);
  console.log(`${purple} ERROR:`, err.name, err.message);

  // un clean state exit immediately
  process.exit(1);
});
/**
 * Any promise that we don't handle will be catched here
 * it should be before all of code executions
 * */
process.on("unhandledRejection", (err) => {
  const purple = "\x1b[35m";
  console.log(`${purple} ⚠️ UNHANDLED REJECTION💥... SHUTTING DOWN ⚠️ `);

  if (err instanceof Error)
    console.log(`${purple} unhandledRejection:`, err.name, err.message);
  else console.log(`${purple} unhandledRejection: unknown error`);

  server?.close(() => process.exit(1));
});

// Imports
////////////////////////////
import dotenv from "dotenv";
// Load environment variables from the specified file. should be at top level
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
  const purple = "\x1b[35m";
  const reset = "\x1b[0m";
  console.log(purple + "Connected to MongoDB 🚀" + reset);

  server = app.listen(port, () => {
    console.log(
      `${purple}App running in ${env.NODE_ENV.toUpperCase()} on localhost:${port}... ${reset}`
    );
  });
});


