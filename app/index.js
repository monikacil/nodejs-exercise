import express from "express";
import { PORT } from "./config.js";
import { fileURLToPath } from "url";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import router from "./routes/web.js";

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

// static - public
app.use(express.static(path.join(__dirname, "../public")));

// body parser
app.use(express.urlencoded({ extended: true }));

// routes
app.use(router);

// start express server
app.listen(PORT);
