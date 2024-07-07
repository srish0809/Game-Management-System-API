const scoreService = require("../services/score.service");
const scoreModel = require("../models/score.model");

jest.mock("../models/score.model");

describe("Score Service", () => {
  describe("addScore", () => {
    it("should add a score successfully", async () => {
      const scoreData = { userId: "1", gameId: "1", score: 100 };
      const newScore = { id: "1", ...scoreData };

      scoreModel.addScore.mockResolvedValue(newScore);

      const result = await scoreService.addScore(scoreData);

      expect(scoreModel.addScore).toHaveBeenCalledWith(scoreData);
      expect(result).toEqual(newScore);
    });

    it("should throw an error if required fields are missing", async () => {
      const scoreData = { userId: "1", gameId: "1" };

      await expect(scoreService.addScore(scoreData)).rejects.toThrow(
        "User ID, Game ID, and score are required"
      );
    });

    it("should throw an error if adding the score fails", async () => {
      const scoreData = { userId: "1", gameId: "1", score: 100 };

      scoreModel.addScore.mockRejectedValue(new Error("Database error"));

      await expect(scoreService.addScore(scoreData)).rejects.toThrow(
        "Could not add score: Database error"
      );
    });
  });

  describe("getScoresByUser", () => {
    it("should return scores for a user", async () => {
      const scores = [{ id: "1", userId: "1", gameId: "1", score: 100 }];
      scoreModel.getScoresByUser.mockResolvedValue(scores);

      const result = await scoreService.getScoresByUser("1");

      expect(scoreModel.getScoresByUser).toHaveBeenCalledWith("1");
      expect(result).toEqual(scores);
    });

    it("should throw an error if no scores are found for the user", async () => {
      scoreModel.getScoresByUser.mockResolvedValue(null);

      await expect(scoreService.getScoresByUser("1")).rejects.toThrow(
        "Scores not found for this user"
      );
    });

    it("should throw an error if fetching scores fails", async () => {
      scoreModel.getScoresByUser.mockRejectedValue(new Error("Database error"));

      await expect(scoreService.getScoresByUser("1")).rejects.toThrow(
        "Error fetching scores for user: Database error"
      );
    });
  });

  describe("getScoresByGame", () => {
    it("should return scores for a game", async () => {
      const scores = [{ id: "1", userId: "1", gameId: "1", score: 100 }];
      scoreModel.getScoresByGame.mockResolvedValue(scores);

      const result = await scoreService.getScoresByGame("1");

      expect(scoreModel.getScoresByGame).toHaveBeenCalledWith("1");
      expect(result).toEqual(scores);
    });

    it("should throw an error if no scores are found for the game", async () => {
      scoreModel.getScoresByGame.mockResolvedValue(null);

      await expect(scoreService.getScoresByGame("1")).rejects.toThrow(
        "Scores not found for this game"
      );
    });

    it("should throw an error if fetching scores fails", async () => {
      scoreModel.getScoresByGame.mockRejectedValue(new Error("Database error"));

      await expect(scoreService.getScoresByGame("1")).rejects.toThrow(
        "Error fetching scores for game: Database error"
      );
    });
  });
});
