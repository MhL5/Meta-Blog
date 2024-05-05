import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

/**
 * global synchronous code bug handler
 * TODO: we need to add a functionality so that the server can restart after shutting down.
 * this function should be place before synchronous code executions otherwise it can not catch errors
 */
process.on("uncaughtException", (err) => {
  const purple = "\x1b[35m";
  console.log(`${purple} ⚠️ UNHANDLED EXCEPTION💥... SHUTTING DOWN ⚠️`);
  console.log(`${purple} ERROR:`, err.name, err.message);

  // un clean state exit immediately
  process.exit(1);
});

/**
 * dotenv config
 */
// dotenv.config({ path: "../config.env" });

import mongoose from "mongoose";
import app from "./app";
import { env } from "./utils/env";

const DB = env.MONGODB_CONNECTION_STRING.replace(
  "<password>",
  env.MONGODB_PASSWORD
);

mongoose
  .connect(DB)
  .catch((err) => console.log(`DB connection failed💥: ${err}`))
  .then(() => console.log(`connected`));

const port = env.PORT || 3000;
const server = app.listen(port, () => {
  const blue = "\x1b[34m";

  console.log(
    `${blue} App running ${env.NODE_ENV.toUpperCase()} on localhost:${port}...`
  );
});

/**
 * Any promise that we don't handle will be catched here
 * TODO: we need to add a functionality so that the server can restart after shutting down.
 * it should be before all of code executions
 * */
process.on("unhandledRejection", (err) => {
  const purple = "\x1b[35m";
  console.log(`${purple} ⚠️ UNHANDLED REJECTION💥... SHUTTING DOWN ⚠️ `);

  if (err instanceof Error)
    console.log(`${purple} unhandledRejection:`, err.name, err.message);
  else console.log(`${purple} unhandledRejection: unknown error`);

  server.close(() => process.exit(1));
});
