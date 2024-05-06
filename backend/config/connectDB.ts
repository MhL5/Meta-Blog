import mongoose from "mongoose";
import { env } from "../src/utils/env";
import catchAsync from "../src/utils/catchAsync";

const DB = env.MONGODB_CONNECTION_STRING.replace(
  "<password>",
  env.MONGODB_PASSWORD
).replace("<username>", env.MONGODB_USERNAME);

/**
 * Asynchronously connects to the MongoDB database using Mongoose.
 * The connection string is constructed by replacing placeholders with
 * environment-specific values for username and password.
 * 
 * This function is wrapped with a `catchAsync` utility that handles any errors
 * by passing them to the next middleware function in the Express.js stack.
 * 
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 */
const connectDB = catchAsync(async () => {
  await mongoose.connect(DB);
});

export { connectDB };
