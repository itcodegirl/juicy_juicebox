function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

function requireActiveUser(req, res, next) {
  if (req.user && req.user.active === false) {
    next({
      name: "UserInactiveError",
      message: "This user profile has been deactivated",
    });
  }

  next();
}

module.exports = {
  requireUser,
  requireActiveUser,
};
