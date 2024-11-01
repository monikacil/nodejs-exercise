import express from "express";
import { uploader } from "./../services/uploader.js";

import {
  showPlantsList,
  showPlantDetails,
  showAddPlantForm,
  addPlant,
  showEditPlantForm,
  editPlant,
  deletePlant,
  downloadXlsx,
  deleteImg,
} from "../controllers/plant.controller.js";

import {
  showUserDetails,
  updateUserDetails,
  showRegisterForm,
  register,
  showLoginForm,
  login,
  logout,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/profile", showUserDetails);

router.post("/profile", updateUserDetails);

router.get("/register", showRegisterForm);

router.post("/register", register);

router.get("/login", showLoginForm);

router.post("/login", login);

router.get("/logout", logout);

router.get("/plants", showPlantsList);

router.get("/plants/form", showAddPlantForm);

router.post("/plants/form", uploader.array("images"), addPlant);

router.get("/plants/:id/form", showEditPlantForm);

router.get("/plants/:id/delete-img/:fileId", deleteImg);

router.post("/plants/:id/form", uploader.array("images", 6), editPlant);

router.get("/plants/:id/delete", deletePlant);

router.get("/plants/:id", showPlantDetails);

router.get("/plants/download/xlsx", downloadXlsx);

router.get("*", (req, res) => {
  res.render("layout/404");
});

export default router;
