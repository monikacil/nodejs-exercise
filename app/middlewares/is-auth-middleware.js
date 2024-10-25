export default function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
    return;
  }
  next();
}
