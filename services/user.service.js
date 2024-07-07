const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async ({ username, email, password, role }) => {
  try {
    if (!username || !email || !password || !role) {
      throw new Error("Please provide all fields!!");
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
    throw new Error(`Could not create user: ${error.message}`);
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return { token };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

const getUserProfile = async (userId) => {
  try {
    const userDetails = await userModel.findUserById(userId);
    if (!userDetails) {
      throw new Error("User not found");
    }
    const { password, ...user } = userDetails;
    return user;
  } catch (error) {
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
