import mongoose, { Schema } from "mongoose";

const PlantSchema = new Schema({
  species: {
    type: String,
    require: true,
  },
  variety: {
    type: String,
    require: true,
  },
  price: String,
  date: {
    type: Date,
    require: true,
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
    },
    isProffessional: {
      type: Boolean,
      default: false,
    },
  },
  passport: String,
  img: Array,
  country: String,
});

export default mongoose.model("Plant", PlantSchema);
