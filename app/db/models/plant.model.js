import mongoose, { Schema } from "mongoose";

const PlantSchema = new Schema({
  name: String,
  price: String,
  date: Date,
});

export default mongoose.model("Plant", PlantSchema);
