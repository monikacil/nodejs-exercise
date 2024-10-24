import mongoose, { Schema } from "mongoose";

const PlantSchema = new Schema({
  species: {
    type: String,
    required: [true, "Species is required"],
    minLength: [3, "Minimum length is 3 characters"],
    trim: true,
    lowercase: true,
  },
  variety: {
    type: String,
    required: [true, "Variety is required"],
    minLength: [3, "Minimum length is 3 characters"],
    trim: true,
    lowercase: true,
  },
  price: {
    type: String,
    trim: true,
    lowercase: true,
  },
  date: {
    type: Date,
  },
  passport: {
    type: String,
    required: [true, "Passport number is required"],
    trim: true,
  },
  buyer: {
    name: {
      type: String,
      required: [true, "Buyer name is required"],
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
      trim: true,
      required: [true, "Buyer phone number is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Buyer email is required"],
    },
    country: {
      type: String,
    },
  },
  img: Array,
});

export default mongoose.model("Plant", PlantSchema);
