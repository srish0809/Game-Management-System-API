const scoreModel = require('../models/score.model');

const addScore = async (scoreData) => {
  return scoreModel.addScore(scoreData);
};

const getScoresByUser = async (userId) => {
  return scoreModel.getScoresByUser(userId);
};

const getScoresByGame = async (gameId) => {
  return scoreModel.getScoresByGame(gameId);
};

module.exports = {
  addScore,
  getScoresByUser,
  getScoresByGame,
};
