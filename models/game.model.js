const prisma = require("../config/db.config");

const createGame = (data) => prisma.game.create({ data });

const getAllGames = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  try {
    const games = await prisma.game.findMany({
      where: { deleted: false },
      skip: offset,
      take: limit,
    });
    return games;
  } catch (error) {
    throw new Error(`Error fetching games: ${error.message}`);
  }
};

const getGameById = (id) => prisma.game.findUnique({ where: { id } });

const updateGame = (id, data) => prisma.game.update({ where: { id }, data });
const deleteGame = (id) =>
  prisma.game.delete({ where: { id }, data: { deleted: true } });

module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
};
