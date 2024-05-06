import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";

/**
 * 1. import your model as collection
 * @example import { ArticleModel as collection } from "../model/articleModel";
 *
 * 2. update dotenv path if needed
 * @example dotenv.config({ path: `${__dirname}/../../config.env` });
 *
 * 3. run the script with --delete to delete everything inside the collection
 * bun importDevData.ts --delete
 *
 * 4. update the jsonData path and run this script with --import to import your json file
 * bun importDevData.ts --import
 */
import { ArticleLikeModel as collection } from "../model/articleLikeModel";
dotenv.config({ path: `${__dirname}/../../config.env` });
const jsonData = JSON.parse(
  fs.readFileSync(`${__dirname}/likeData.json`, "utf-8")
);

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

// import the data
async function importData() {
  try {
    // use { validateBeforeSave: false } if you need
    await collection.create(jsonData);

    console.log(`Data Successfully loaded.📜`);
  } catch (error) {
    console.error(`⚠️⚠️  importing data failed: ${error}  ⚠️⚠️`);
  } finally {
    process.exit();
  }
}

async function deleteData() {
  try {
    await collection.deleteMany();

    console.log(`Data successfully Deleted.🗑️`);
  } catch (error) {
    console.error(`⚠️⚠️   deleting data failed: ${error}  ⚠️⚠️`);
  } finally {
    process.exit();
  }
}

if (process.argv[2] === "--import") importData();
if (process.argv[2] === "--delete") deleteData();
