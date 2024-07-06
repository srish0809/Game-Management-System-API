const prisma = require('../config/db.config');

const createGame = (data) => prisma.game.create({ data });
const getAllGames = () => prisma.game.findMany();
const getGameById = (id) => prisma.game.findUnique({ where: { id } });
const updateGame = (id, data) => prisma.game.update({ where: { id }, data });
const deleteGame = (id) => prisma.game.delete({ where: { id } });

module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
};
