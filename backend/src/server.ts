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
  console.log(` ⚠️ UNHANDLED EXCEPTION💥... SHUTTING DOWN ⚠️`);
  console.log(` ERROR:`, err.name, err.message);

  // un clean state exit immediately
  process.exit(1);
});

// Imports
////////////////////////////
import dotenv from "dotenv";
// Load environment variables from the specified file. should be at top level after importing dotenv
dotenv.config({ path: `${__dirname}/../config.env` });
import mongoose from "mongoose";
import app from "./app";
import { env } from "./utils/env";
import { connectDB } from "../config/connectDB";
import { IncomingMessage, Server, ServerResponse } from "http";

/**
 * This code snippet initializes a server and connects it to a MongoDB database.
 * It starts by declaring a variable `server` of type `Server<typeof IncomingMessage, typeof ServerResponse> | null` and setting it to `null`.
 * Then, it calls the `connectDB` function to establish a connection with the MongoDB database.
 * Once the connection is open, it logs a success message and retrieves the port number from the `env` object.
 * It then starts the server by calling the `listen` method on the `app` object, passing the port number and a callback function.
 * The callback function logs a message indicating the server is running and the environment it is running in.
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
 * it should be before all of code executions
 * */
process.on("unhandledRejection", (err) => {
  console.log(" ⚠️ UNHANDLED REJECTION💥... SHUTTING DOWN ⚠️ ");

  if (err instanceof Error)
    console.log(` unhandledRejection:`, err.name, err.message);
  else console.log(` unhandledRejection: unknown error `);

  server?.close(() => process.exit(1));
});
