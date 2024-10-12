import express from "express";

import {
  showPlantsList,
  showPlantDetails,
  showPlantEditForm,
  plantEditForm,
} from "../controllers/plant.controller.js";

import { showUserDetails } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    url: req.url,
  });
});

router.get("/user", showUserDetails);

router.get("/plants", showPlantsList);

router.get("/plants/form", showPlantEditForm);

router.get("/plants/:id", showPlantDetails);

router.post("/plants/form", plantEditForm);

router.get("*", (req, res) => {
  res.render("layout/404", {
    url: req.url,
  });
});

export default router;
