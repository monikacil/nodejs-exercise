import mongoose, { Schema } from "mongoose";
import validateEmail from "../validators.js";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  email: {
    type: String,
    require: [true, "Email is required"],
    lowercase: true,
    trim: true,
    unique: true,
    validate: [validateEmail, "Incorrect email address"],
  },
  password: {
    type: String,
    require: true,
    minLength: [6, "Password must contain at least 6 letters"],
  },
});

UserSchema.path("password").set((value) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(value, salt);
  return hash;
});

UserSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    error.errors = { email: { message: "Incorrect imail address" } };
    next(error);
  } else {
    next();
  }
});

export default mongoose.model("User", UserSchema);
