import mongoose, { Schema } from "mongoose";

const BuyerSubSchema = new Schema({
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
});

const ImageSchema = new Schema(
  {
    originalname: String,
    filename: String,
  },
  { timestamps: true }
);

const PlantSchema = new Schema({
  _ownerId: { type: mongoose.Types.ObjectId, ref: "User" },
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
  buyer: BuyerSubSchema,
  images: {
    type: [ImageSchema],
    default: [],
  },
});

export default mongoose.model("Plant", PlantSchema);
