import Plant from "./../db/models/plant.model.js";

async function showPlantsList(req, res) {
  const { q, sort, searchBy } = req.query;
  const page = req.query.page || 1;
  const perPage = 10;

  const allQueries = {};

  const searchValue = searchBy ? searchBy : "species";

  if (q) {
    allQueries[searchValue] = { $regex: q, $options: "ix" };
  }

  let query = Plant.find(allQueries);

  query.skip((page - 1) * perPage);
  query = query.limit(perPage);

  if (sort) {
    const s = sort.split("|");
    query.sort = query.sort({ [s[0]]: s[1] });
  }

  const plants = await query.exec();

  const resultsCount = await Plant.find(allQueries).countDocuments();
  const pagesCount = Math.ceil(resultsCount / perPage);

  res.render("plants/plants", {
    plants,
    page,
    pagesCount,
    resultsCount,
  });
}

async function showPlantDetails(req, res) {
  const plant = await Plant.findById(req.params.id);
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

async function addPlantForm(req, res) {
  const data = req.body;
  try {
    const plant = new Plant({
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
    });

    await plant.save();
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
  const plant = await Plant.findById(req.params.id);
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

async function editPlantForm(req, res) {
  const data = req.body;
  const plant = await Plant.findById(req.params.id);
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
  try {
    await plant.save();
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
  try {
    await Plant.findByIdAndDelete({ _id: req.params.id });
    res.redirect("/plants");
  } catch (e) {
    console.log(e);
  }
}

export {
  showPlantsList,
  showPlantDetails,
  showAddPlantForm,
  addPlantForm,
  showEditPlantForm,
  editPlantForm,
  deletePlant,
};
