export default function viewVar(req, res, next) {
  res.locals.url = req.url;
  res.locals.errors = null;
  res.locals.form = {};
  res.locals.query = req.query;
  next();
}
