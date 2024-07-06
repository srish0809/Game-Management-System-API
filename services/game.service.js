const gameModel = require('../models/game.model');

const createGame = async (gameData) => {
  gameData.releaseDate = new Date(gameData.releaseDate).toISOString(); 
  return gameModel.createGame(gameData);
};

const getAllGames = async () => {
  return gameModel.getAllGames();
};

const getGameById = async (id) => {
  const game = await gameModel.getGameById(id);
  if (!game) {
    throw new Error('Game not found');
  }
  return game;
};

const updateGame = async (id, gameData) => {
  const game = await gameModel.getGameById(id);
  if (!game) {
    throw new Error('Game not found');
  }
  if (gameData.releaseDate) {
    gameData.releaseDate = new Date(gameData.releaseDate).toISOString(); 
  }
  return gameModel.updateGame(id, gameData);
};

const deleteGame = async (id) => {
  const game = await gameModel.getGameById(id);
  if (!game) {
    throw new Error('Game not found');
  }
  return gameModel.deleteGame(id);
};

module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
};
