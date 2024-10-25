import User from "./../db/models/user.model.js";

function showUserDetails(req, res) {
  res.render("user/profile", {
    user: req.session.user,
  });
}

async function updateUserDetails(req, res) {
  const user = await User.findById(req.session.user._id);
  user.email = req.body.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  try {
    await user.save();
    req.session.user.email = user.email;
    res.redirect("back");
  } catch (e) {
    res.render("user/profile", {
      errors: e.errors,
      user: req.body,
    });
  }
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
  try {
    const user = await User.findOne({ email: req.body.email });
    const isValidPassword = await user.comparePassword(req.body.password);

    if (!user || !isValidPassword) {
      throw new Error("error occure");
    }

    req.session.user = {
      _id: user._id,
      email: user.email,
    };
    res.redirect("/");
  } catch (e) {
    res.render("user/login", {
      errors: true,
      form: req.body,
    });
  }
}

async function logout(req, res) {
  req.session.destroy();
  res.redirect("/");
}

export {
  showUserDetails,
  showRegisterForm,
  register,
  showLoginForm,
  login,
  logout,
  updateUserDetails,
};
