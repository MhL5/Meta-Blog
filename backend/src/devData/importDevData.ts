import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import { UserModel } from "../model/userModel";

dotenv.config({ path: `${__dirname}/../../config.env` });

let DB = null;
if (
  process.env.MONGODB_CONNECTION_STRING &&
  process.env.MONGODB_PASSWORD &&
  process.env.MONGODB_USERNAME
)
  DB = process.env.MONGODB_CONNECTION_STRING?.replace(
    "<password>",
    process.env?.MONGODB_PASSWORD
  ).replace("<username>", process.env?.MONGODB_USERNAME);


DB
  ? mongoose
      .connect(DB)
      .then(() => console.log(`DB connected`))
      .catch((err) => console.error(`DB connection failed: ${err}`))
  : console.error("ENV VARIABLES ARE UNDEFINED OR NULL");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/userData.json`, "utf-8")
);

// import the data
async function importData() {
  try {
    await UserModel.create(users, { validateBeforeSave: false });

    console.log(`Data Successfully loaded.📜`);
  } catch (error) {
    console.error(`⚠️⚠️  importing data failed: ${error}  ⚠️⚠️`);
  } finally {
    process.exit();
  }
}

async function deleteData() {
  try {
    await UserModel.deleteMany();

    console.log(`Data successfully Deleted.🗑️`);
  } catch (error) {
    console.error(`⚠️⚠️   deleting data failed: ${error}  ⚠️⚠️`);
  } finally {
    process.exit();
  }
}

if (process.argv[2] === "--import") importData();
if (process.argv[2] === "--delete") deleteData();
