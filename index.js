import express from "express";

import "./db.js";

const port = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("test");
});

app.listen(port);
