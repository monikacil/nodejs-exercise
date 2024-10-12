import User from "./../db/models/user.model.js";

function showUserDetails(req, res) {
  res.render("user", {
    url: req.url,
  });
}

export { showUserDetails };
