import Plant from "./../db/models/plant.model.js";

async function showPlantsList(req, res) {
  const { q, sort, searchBy } = req.query;
  const page = req.query.page || 1;
  const perPage = 10;

  // const allQueries = {};

  // const searchValue = searchBy ? searchBy : "species";

  // if (q) {
  //   allQueries[searchValue] = { $regex: q, $options: "ix" };
  // }

  let query = Plant.findOne({ userId: req.session.user._id });

  // query.skip((page - 1) * perPage);
  // query = query.limit(perPage);

  // if (sort) {
  //   const s = sort.split("|");
  //   query.sort = query.sort({ [s[0]]: s[1] });
  // }

  const plants = await query.exec();

  const resultsCount = plants.plants.length;
  const pagesCount = Math.ceil(resultsCount / perPage);

  res.render("plants/plants", {
    plants: plants?.plants || [],
    page,
    pagesCount,
    resultsCount,
  });
}

async function showPlantDetails(req, res) {
  const userPlants = await Plant.findOne({ userId: req.session.user._id });
  let plant = null;
  userPlants.plants.forEach((el) => {
    if (el._id.toString() === req.params.id) {
      plant = el;
    }
  });
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
  const userPlants = await Plant.findOne({ userId: req.session.user._id });
  const data = req.body;
  const plant = {
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
  };

  try {
    if (userPlants) {
      userPlants.plants.push(plant);
      await userPlants.save();
    } else {
      const newPlant = new Plant({
        userId: req.session.user._id,
        plants: [],
      });
      newPlant.plants.push(plant);
      await newPlant.save();
    }
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
  const userPlants = await Plant.findOne({ userId: req.session.user._id });
  let plant = null;
  userPlants.plants.forEach((el) => {
    if (el._id.toString() === req.params.id) {
      plant = el;
    }
  });
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
  };

  res.render("plants/form", {
    form: formBody,
    formName: "Edit Plant Details",
  });
}

async function editPlant(req, res) {
  const data = req.body;

  const userPlants = await Plant.findOne({ userId: req.session.user._id });
  let plant = null;
  let idx = null;
  userPlants.plants.forEach((el, idx) => {
    if (el._id.toString() === req.params.id) {
      plant = el;
      idx = idx;
    }
  });
  plant.species = data.species;
  plant.variety = data.variety;
  plant.price = data.price;
  plant.date = data.date;
  plant.passport = data.passport;
  plant.buyer.name = data["buyer-name"];
  plant.buyer.address = data.address;
  plant.buyer.phone = data.phone;
  plant.buyer.email = data.email;
  plant.buyer.country = data.country;

  userPlants.plants[idx] = plant;

  try {
    await userPlants.save();
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
  const userPlants = await Plant.findOne({ userId: req.session.user._id });
  userPlants.plants = userPlants.plants.filter((plant) => plant._id.toString() != req.params.id);
  try {
    await userPlants.save();
    res.redirect("/plants");
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
};
