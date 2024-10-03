import express from "express";
import { PORT } from "./config.js";
import { fileURLToPath } from "url";
import path from "path";
import expressLayouts from "express-ejs-layouts";

// database connection
import "./db/db.js";

// Getting directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// library - layout for views
app.use(expressLayouts);

// set view engine - ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/views"));
app.set("layout", "layout/main");

// routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/plants", (req, res) => {
  res.send("plants list");
});

app.get("/plants/:id", (req, res) => {
  res.send("plant view");
});

// start express server
app.listen(PORT);
