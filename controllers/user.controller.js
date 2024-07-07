const userService = require("../services/user.service");

const register = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await userService.registerUser({
      username,
      email,
      password,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await userService.loginUser({ email, password });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
