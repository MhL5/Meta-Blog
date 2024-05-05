import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import { ArticleModel } from "../model/articleModel";

dotenv.config({ path: `${__dirname}/../../config.env` });

let DB = null;
if (process.env.MONGODB_CONNECTION_STRING && process.env.MONGODB_PASSWORD)
  DB = process.env.DATABASE?.replace(
    "<password>",
    process.env?.MONGODB_PASSWORD
  );

DB
  ? mongoose
      .connect(DB)
      .then(() => console.log(`DB connected`))
      .catch((err) => console.error(`DB connection failed: ${err}`))
  : console.error("ENV VARIABLES ARE UNDEFINED OR NULL");

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

// import the data
async function importData() {
  try {
    // await articleModel.create(tours, { validateBeforeSave: false });

    console.log(`Data Successfully loaded.📜`);
  } catch (error) {
    console.error(`⚠️⚠️  importing data failed: ${error}  ⚠️⚠️`);
  } finally {
    process.exit();
  }
}

async function deleteData() {
  try {
    await ArticleModel.deleteMany();

    console.log(`Data successfully Deleted.🗑️`);
  } catch (error) {
    console.error(`⚠️⚠️   deleting data failed: ${error}  ⚠️⚠️`);
  } finally {
    process.exit();
  }
}

if (process.argv[2] === "--import") importData();
if (process.argv[2] === "--delete") deleteData();
