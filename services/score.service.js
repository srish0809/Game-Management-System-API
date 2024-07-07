
const scoreModel = require("../models/score.model");

const addScore = async ({ userId, gameId, score }) => {
  try {
    if (!userId || !gameId || !score) {
      throw new Error("User ID, Game ID, and score are required");
    }

    const newScore = await scoreModel.addScore({ userId, gameId, score });
    return newScore;
  } catch (error) {
    throw new Error(`Could not add score: ${error.message}`);
  }
};

const getScoresByUser = async (userId) => {
  try {
    const scores = await scoreModel.getScoresByUser(userId);
    if (!scores) {
      throw new Error("Scores not found for this user");
    }
    return scores;
  } catch (error) {
    throw new Error(`Error fetching scores for user: ${error.message}`);
  }
};

const getScoresByGame = async (gameId) => {
  try {
    const scores = await scoreModel.getScoresByGame(gameId);
    if (!scores) {
      throw new Error("Scores not found for this game");
    }
    return scores;
  } catch (error) {
    throw new Error(`Error fetching scores for game: ${error.message}`);
  }
};

module.exports = {
  addScore,
  getScoresByUser,
  getScoresByGame,
};
