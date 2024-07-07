const gameService = require("../services/game.service");

const createGame = async (req, res, next) => {
  try {
    const game = await gameService.createGame(req.body);
    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
};

const getAllGames = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const games = await gameService.getAllGames(
      parseInt(page),
      parseInt(pageSize)
    );
    res.json(games);
  } catch (error) {
    next(error);
  }
};

const getGameById = async (req, res, next) => {
  try {
    const game = await gameService.getGameById(req.params.id);
    res.json(game);
  } catch (error) {
    next(error);
  }
};

const updateGame = async (req, res, next) => {
  try {
    const game = await gameService.updateGame(req.params.id, req.body);
    res.json(game);
  } catch (error) {
    next(error);
  }
};

const deleteGame = async (req, res, next) => {
  try {
    await gameService.deleteGame(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
};
