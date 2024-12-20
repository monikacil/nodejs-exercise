import mongoose from "mongoose";
import { DATABASE } from "./../config.js";

try {
  mongoose.connect(DATABASE);
  console.log(`Connected to database - ${DATABASE}`);
} catch (error) {
  console.log(error);
}
