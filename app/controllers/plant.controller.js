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

  res.render("plants", {
    plants,
    page,
    pagesCount,
    resultsCount,
  });
}

async function showPlantDetails(req, res) {
  const plant = await Plant.find({ _id: req.params.id }).lean().exec();
  res.render("plant", {
    plant: plant[0],
  });
}

function showPlantEditForm(req, res) {
  res.render("form", {
    url: req.url,
  });
}

async function plantEditForm(req, res) {
  const plant = new Plant({
    species: req.body.species,
    variety: req.body.variety,
    price: req.body.price,
    date: req.body.date,
    passport: req.body.passport,
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
