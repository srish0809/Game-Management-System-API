const prisma = require('../config/db.config');

const addScore = (data) => prisma.score.create({ data });
const getScoresByUser = (userId) => prisma.score.findMany({ where: { userId } });
const getScoresByGame = (gameId) => prisma.score.findMany({ where: { gameId } });

module.exports = {
  addScore,
  getScoresByUser,
  getScoresByGame,
};
