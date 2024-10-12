import mongoose, { Schema } from "mongoose";

const PlantSchema = new Schema({
  plant: {
    species: {
      type: String,
      require: true,
      trim: true,
    },
    variety: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: String,
      require: true,
      trim: true,
    },
    date: {
      type: Date,
      require: true,
      trim: true,
    },
    passport: {
      type: String,
      require: true,
      trim: true,
    },
  },
  buyer: {
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
    },
    email: {
      type: String,
      trim: true,
    },
    isProffessional: {
      type: Boolean,
      default: false,
    },
  },
  passport: {
    type: String,
    require: true,
    trim: true,
  },
  img: Array,
  country: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Plant", PlantSchema);
