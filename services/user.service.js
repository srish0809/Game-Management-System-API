const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async ({ username, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      role,
    });
    return user;
  } catch (error) {
    throw new Error("User already exists");
  }
};

const loginUser = async ({ email, password }) => {
  const user = await userModel.findUserByEmail(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return { token };
  } else {
    throw new Error("Invalid email or password");
  }
};

const getUserProfile = async (userId) => {
  const user = await userModel.findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
