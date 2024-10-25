import express from "express";
import { PORT } from "./config.js";
import { fileURLToPath } from "url";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import router from "./routes/web.js";
import cors from "cors";
import viewMiddleware from "./middlewares/view-middleware.js";
import userMiddleware from "./middlewares/user-middleware.js";
import isAuthMiddleware from "./middlewares/is-auth-middleware.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { SESSION_KEY_SECRET } from "./config.js";

// database connection
import "./db/db.js";

// Getting directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(
  session({
    secret: SESSION_KEY_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
    resave: false,
  })
);

app.use(viewMiddleware);
app.use(userMiddleware);
app.use("/plants", isAuthMiddleware);
app.use("/profile", isAuthMiddleware);

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
app.use(cookieParser());

// routes
app.use(router);

// start express server
app.listen(PORT);
