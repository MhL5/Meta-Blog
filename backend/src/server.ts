/**
 * This module configures the environment variables, sets up the database connection,
 * and initializes the Express application.
 *
 */

/**
 * global synchronous code bug handler
 * this function should be place before synchronous code executions otherwise it can not catch all the errors
 */
process.on("uncaughtException", (err) => {
  console.log(` ⚠️ UNHANDLED EXCEPTION💥... SHUTTING DOWN ⚠️`);
  console.log(` ERROR:`, err.name, err.message);

  // un clean state exit immediately
  process.exit(1);
});

/**
 *  Imports
 *  after global synchronous code bug handler we can start importing the files we need
 */
import dotenv from "dotenv";
// Load environment variables from the specified file. should be at top level after importing dotenv
dotenv.config({ path: `${__dirname}/../config.env` });
import mongoose from "mongoose";
import app from "./app";
import { env } from "./utils/env";
import { connectDB } from "./config/connectDB";
import { IncomingMessage, Server, ServerResponse } from "http";

/**
 * This code snippet initializes a server and connects it to a MongoDB database.
 */
let server: Server<typeof IncomingMessage, typeof ServerResponse> | null = null;
connectDB();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB 🚀");

  const port = env.PORT || 3000;
  server = app.listen(port, () => {
    console.log(
      `App running in ${env.NODE_ENV.toUpperCase()} on localhost:${port}... `
    );
  });
});

/**
 * Any promise that we don't handle will be catched here
 *
 */
process.on("unhandledRejection", (err) => {
  console.log(" ⚠️ UNHANDLED REJECTION💥... SHUTTING DOWN ⚠️ ");

  if (err instanceof Error)
    console.log(` unhandledRejection:`, err.name, err.message);
  else console.log(` unhandledRejection: unknown error `);

  server?.close(() => process.exit(1));
});
