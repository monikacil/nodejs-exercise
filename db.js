import mongoose, { Schema } from "mongoose";
mongoose.connect("mongodb://localhost:27017/test_database");
console.log("Connected to database");

const PlantSchema = new Schema({
  name: String,
  price: String,
  date: Date,
});

const Plant = mongoose.model("Plant", PlantSchema);

async function start() {
  const plant = new Plant({
    name: "Alocasia",
    price: "29,99",
    date: new Date(),
  });

  await plant.save();
}

start();
