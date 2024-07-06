const scoreService = require('../services/score.service');

const addScore = async (req, res) => {
  try {
    const score = await scoreService.addScore(req.body);
    res.status(201).json(score);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getScoresByUser = async (req, res) => {
  try {
    const scores = await scoreService.getScoresByUser(req.params.userId);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getScoresByGame = async (req, res) => {
  try {
    const scores = await scoreService.getScoresByGame(req.params.gameId);
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addScore,
  getScoresByUser,
  getScoresByGame,
};
