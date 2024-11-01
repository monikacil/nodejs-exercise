import ExcelJS from "exceljs";

import Plant from "./../db/models/plant.model.js";

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

export default workbook;
