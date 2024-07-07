const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async ({ username, email, password, role }) => {
  try {
    if (!username || !email || !password || !role) {
      throw new Error("Username, email, password, and role are required");
    }

    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User with this email ID already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return user;
  } catch (error) {
    return { error: `Could not create user: ${error.message}` };
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
  const userDetails = await userModel.findUserById(userId);
  const { password, ...user } = userDetails;
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
