import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";

import Plant from "./../db/models/plant.model.js";

async function showPlantsList(req, res) {
  const { q, sort } = req.query;
  const page = req.query.page || 1;
  const perPage = 10;

  const _q = { _ownerId: req.session.user._id };

  if (q) {
    _q.variety = { $regex: q, $options: "ix" };
  }

  let query = Plant.find(_q).lean();

  query.skip((page - 1) * perPage);
  query = query.limit(perPage);

  if (sort) {
    const s = sort.split("|");
    query.sort = query.sort({ [s[0]]: s[1] });
  }

  const plants = await query.exec();

  const resultsCount = await Plant.find(_q).countDocuments();
  const pagesCount = Math.ceil(resultsCount / perPage);

  res.render("plants/plants", {
    plants: plants || [],
    page,
    pagesCount,
    resultsCount,
  });
}

async function showPlantDetails(req, res) {
  const plant = await Plant.findOne({ _id: req.params.id });
  res.render("plants/plant", {
    plant: plant,
  });
}

function showAddPlantForm(req, res) {
  res.render("plants/form", {
    formName: "Add new Plant",
    form: {
      date: new Date().toISOString().substring(0, 10),
    },
  });
}

async function addPlant(req, res) {
  const userId = new mongoose.Types.ObjectId(req.session.user._id);
  const data = req.body;

  const plant = new Plant({
    _ownerId: userId,
    species: data.species,
    variety: data.variety,
    price: data.price,
    date: data.date,
    passport: data.passport,
    buyer: {
      name: data["buyer-name"],
      address: data.address,
      phone: data.phone,
      email: data.email,
      country: data.country,
    },
    images: req.files,
  });

  try {
    await plant.save();
    res.redirect("/plants");
  } catch (e) {
    res.render("plants/form", {
      errors: e.errors,
      formName: "Add new Plant",
      form: req.body,
    });
  }
}

async function showEditPlantForm(req, res) {
  const plant = await Plant.findOne({ _id: req.params.id });

  const formBody = {
    species: plant.species,
    variety: plant.variety,
    price: plant.price,
    date: plant.date.toISOString().substring(0, 10),
    passport: plant.passport,
    ["buyer-name"]: plant.buyer.name,
    address: plant.buyer.address,
    phone: plant.buyer.phone,
    email: plant.buyer.email,
    country: plant.buyer.country,
    images: plant.images,
  };

  res.render("plants/form", {
    form: formBody,
    formName: "Edit Plant Details",
  });
}

async function editPlant(req, res) {
  const plant = await Plant.findOne({ _id: req.params.id });
  const data = req.body;
  const updated = {
    species: data.species,
    variety: data.variety,
    price: data.price,
    date: data.date,
    passport: data.passport,
    buyer: {
      name: data["buyer-name"],
      address: data.address,
      phone: data.phone,
      email: data.email,
      country: data.country,
    },
    images: req.files | [],
  };

  if (req.files) {
    updated.images = plant.images.concat(req.files);
  }

  try {
    await Plant.updateOne({ _id: req.params.id }, updated);
    res.redirect("/plants");
  } catch (e) {
    res.render("plants/form", {
      errors: e.errors,
      formName: "Edit Plant Details",
      form: req.body,
    });
  }
}

async function deletePlant(req, res) {
  try {
    const plant = await Plant.findOne({ _id: req.params.id });
    plant.images.forEach((img) => {
      fs.unlinkSync(path.join("public/images/" + img.filename));
    });
    await Plant.deleteOne({ _id: req.params.id });
    res.redirect("/plants");
  } catch (e) {
    console.log(e);
  }
}

async function downloadXlsx(req, res) {
  const plants = await Plant.find();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sold Plants");
  worksheet.getRow(2).values = [
    "No.",
    "Species",
    "Variety",
    "Passport",
    "Sold date",
    "Name",
    "Address",
    "Country",
    "Phone Number",
    "Email",
  ];

  worksheet.columns = [
    { header: "No.", key: "no", width: 10 },
    { header: "Species", key: "species", width: 30 },
    { header: "Variety", key: "variety", width: 30 },
    { header: "Passport", key: "passport", width: 30 },
    { header: "Sold date", key: "date", width: 30 },
    { header: "Name", key: "name", width: 30 },
    { header: "Address", key: "address", width: 60 },
    { header: "Country", key: "country", width: 10 },
    { header: "Phone Number", key: "phone", width: 30 },
    { header: "Email", key: "email", width: 50 },
  ];
  let counter = 1;
  plants.forEach((plant) => {
    const row = {
      no: counter,
      species: plant.species,
      variety: plant.variety,
      passport: plant.passport,
      date: plant.date,
      name: plant.buyer.name,
      address: plant.buyer.address,
      country: plant.buyer.country,
      phone: plant.buyer.phone,
      email: plant.buyer.email,
    };
    worksheet.addRow(row);
    counter++;
  });

  worksheet.mergeCells("A1", "D1");
  worksheet.getCell("A1").value = "Plants Details";
  worksheet.mergeCells("E1", "J1");
  worksheet.getCell("E1").value = "Buyer Info";

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, size: 16 };
  });
  worksheet.getRow(2).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    res.attachment("sold-plants.xlsx");
    workbook.xlsx.write(res).then(function () {
      res.end();
    });
  } catch (err) {
    res.send({
      status: "error",
      message: "Something went wrong",
    });
  }
}

async function deleteImg(req, res) {
  const plant = await Plant.findOne({ _id: req.params.id });
  let plantImage = null;
  const updatedPlantImages = plant.images.filter((image, idx) => {
    if (image._id.toString() === req.params.fileId) {
      plantImage = image;
    }
    return image._id.toString() !== req.params.fileId;
  });
  try {
    fs.unlinkSync(path.join("public/images/" + plantImage.filename));
    await Plant.updateOne({ _id: req.params.id }, { images: updatedPlantImages });
    res.redirect("/plants/" + req.params.id);
  } catch (e) {
    console.log(e);
  }
}

export {
  showPlantsList,
  showPlantDetails,
  showAddPlantForm,
  addPlant,
  showEditPlantForm,
  editPlant,
  deletePlant,
  downloadXlsx,
  deleteImg,
};
