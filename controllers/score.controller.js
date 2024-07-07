const scoreService = require("../services/score.service");

const addScore = async (req, res, next) => {
  try {
    const score = await scoreService.addScore(req.body);
    res.status(201).json(score);
  } catch (error) {
    next(error);
  }
};

const getScoresByUser = async (req, res, next) => {
  try {
    const scores = await scoreService.getScoresByUser(req.params.userId);
    res.json(scores);
  } catch (error) {
    next(error);
  }
};

const getScoresByGame = async (req, res, next) => {
  try {
    const scores = await scoreService.getScoresByGame(req.params.gameId);
    res.json(scores);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addScore,
  getScoresByUser,
  getScoresByGame,
};
