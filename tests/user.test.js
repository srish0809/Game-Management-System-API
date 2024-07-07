const userService = require("../services/user.service");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../models/user.model");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("User Service", () => {
  const SECRET_KEY = "secret";
  process.env.SECRET_KEY = SECRET_KEY;

  describe("registerUser", () => {
    it("should throw an error if required fields are missing", async () => {
      await expect(userService.registerUser({})).rejects.toThrow(
        "Please provide all fields!!"
      );
    });

    it("should throw an error if role is invalid", async () => {
      await expect(
        userService.registerUser({
          username: "testuser",
          email: "test@example.com",
          password: "password123",
          role: "invalid_role",
        })
      ).rejects.toThrow("Role must be either 'Player' or 'Admin'");
    });

    it("should throw an error if the email is already taken", async () => {
      userModel.findUserByEmail.mockResolvedValue(true);

      await expect(
        userService.registerUser({
          username: "testuser",
          email: "test@example.com",
          password: "password123",
          role: "Player",
        })
      ).rejects.toThrow("User with this email ID already exists");
    });

    it("should register a user successfully", async () => {
      userModel.findUserByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashed_password");
      userModel.createUser.mockResolvedValue({
        id: "1",
        username: "testuser",
        email: "test@example.com",
        role: "Player",
      });

      const user = await userService.registerUser({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        role: "Player",
      });

      expect(user).toEqual({
        id: "1",
        username: "testuser",
        email: "test@example.com",
        role: "Player",
      });
    });

    it("should throw an error if user creation fails", async () => {
      userModel.findUserByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashed_password");
      userModel.createUser.mockRejectedValue(new Error("Database error"));

      await expect(
        userService.registerUser({
          username: "testuser",
          email: "test@example.com",
          password: "password123",
          role: "Player",
        })
      ).rejects.toThrow("Could not create user: Database error");
    });
  });

  describe("loginUser", () => {
    it("should throw an error if email or password is incorrect", async () => {
      userModel.findUserByEmail.mockResolvedValue(null);

      await expect(
        userService.loginUser({
          email: "test@example.com",
          password: "password123",
        })
      ).rejects.toThrow("Invalid email or password");
    });

    it("should return a token for valid credentials", async () => {
      userModel.findUserByEmail.mockResolvedValue({
        id: "1",
        email: "test@example.com",
        password: "hashed_password",
        role: "Player",
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("test_token");

      const result = await userService.loginUser({
        email: "test@example.com",
        password: "password123",
      });

      expect(result).toEqual({ token: "test_token" });
    });

    it("should throw an error if login fails", async () => {
      userModel.findUserByEmail.mockResolvedValue({
        id: "1",
        email: "test@example.com",
        password: "hashed_password",
        role: "Player",
      });
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        userService.loginUser({
          email: "test@example.com",
          password: "password123",
        })
      ).rejects.toThrow("Invalid email or password");
    });
  });

  describe("getUserProfile", () => {
    it("should throw an error if the user is not found", async () => {
      userModel.findUserById.mockResolvedValue(null);

      await expect(userService.getUserProfile("1")).rejects.toThrow(
        "User not found"
      );
    });

    it("should return user profile excluding password", async () => {
      userModel.findUserById.mockResolvedValue({
        id: "1",
        username: "testuser",
        email: "test@example.com",
        password: "hashed_password",
        role: "player",
      });

      const user = await userService.getUserProfile("1");

      expect(user).toEqual({
        id: "1",
        username: "testuser",
        email: "test@example.com",
        role: "player",
      });
    });

    it("should throw an error if fetching profile fails", async () => {
      userModel.findUserById.mockRejectedValue(new Error("Database error"));

      await expect(userService.getUserProfile("1")).rejects.toThrow(
        "Failed to fetch user profile: Database error"
      );
    });
  });
});
