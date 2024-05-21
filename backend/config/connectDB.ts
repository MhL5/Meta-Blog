import mongoose from "mongoose";
import { env } from "../src/utils/env";

const DB = env.MONGODB_CONNECTION_STRING.replace(
  "<password>",
  env.MONGODB_PASSWORD
).replace("<username>", env.MONGODB_USERNAME);

/**
 * Asynchronously connects to the MongoDB database using Mongoose.
 * The connection string is constructed by replacing placeholders with
 * environment-specific values for username and password.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(DB);
  } catch (error) {
    console.log(`DB connection failed`, error);
  }
};

export { connectDB };
