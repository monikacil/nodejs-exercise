import Plant from "./../db/models/plant.model.js";

async function showPlantsList(req, res) {
  const plants = await Plant.find({}).lean();
  plants.forEach((plant, idx) => {
    console.log(plant.plant);
  });
  res.render("plants", {
    plants,
    url: req.url,
  });
}

function showPlantDetails(req, res) {
  res.render("plant", {
    url: req.url,
  });
}

function showPlantEditForm(req, res) {
  res.render("form", {
    url: req.url,
  });
}

async function plantEditForm(req, res) {
  const plant = new Plant({
    plant: {
      species: req.body.species,
      variety: req.body.variety,
      price: req.body.price,
      date: req.body.date,
      passport: req.body.passport,
    },
    buyer: {
      name: req.body["buyer-name"],
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      isProffessional: req.body["is-proffessional"],
    },
  });
  try {
    await plant.save();
    res.redirect("/plants");
  } catch (e) {
    console.log("błąd");
  }
}

export { showPlantsList, showPlantDetails, showPlantEditForm, plantEditForm };
