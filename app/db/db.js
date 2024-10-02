import mongoose from "mongoose";

try {
  mongoose.connect("mongodb://localhost:27017/test_database");
  console.log("Connected to database");
} catch (error) {
  console.log(error);
}
