const rbacMiddleware = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res
      .status(403)
      .json({ message: "You have ventured into uncharted territories!!" });
  }
  next();
};

module.exports = rbacMiddleware;
