import express from "express";

import {
  showPlantsList,
  showPlantDetails,
  showAddPlantForm,
  addPlantForm,
  showEditPlantForm,
  editPlantForm,
  deletePlant,
} from "../controllers/plant.controller.js";

import {
  showUserDetails,
  showRegisterForm,
  register,
  showLoginForm,
  login,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    user: req.session.user,
  });
});

router.get("/user", showUserDetails);

router.get("/register", showRegisterForm);

router.post("/register", register);

router.get("/login", showLoginForm);

router.post("/login", login);

router.get("/plants", showPlantsList);

router.get("/plants/form", showAddPlantForm);

router.post("/plants/form", addPlantForm);

router.get("/plants/:id/form", showEditPlantForm);

router.post("/plants/:id/form", editPlantForm);

router.get("/plants/:id/delete", deletePlant);

router.get("/plants/:id", showPlantDetails);

router.get("*", (req, res) => {
  res.render("layout/404");
});

export default router;
