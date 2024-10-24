import User from "./../db/models/user.model.js";

function showUserDetails(req, res) {
  res.render("user/user");
}

function showRegisterForm(req, res) {
  res.render("user/register");
}

async function register(req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await user.save();
    res.redirect("/login");
  } catch (e) {
    res.render("user/register", {
      errors: e.errors,
      form: req.body,
    });
  }
}

function showLoginForm(req, res) {
  res.render("user/login");
}

async function login(req, res) {
  // const user = new User({
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  try {
    await user.save();
    res.redirect("/");
  } catch (e) {
    res.render("user/login", {
      errors: e.errors,
      form: req.body,
    });
  }
}

export { showUserDetails, showRegisterForm, register, showLoginForm, login };
