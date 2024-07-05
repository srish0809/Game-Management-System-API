const prisma = require('../config/db.config');

const createUser = (data) => prisma.user.create({ data });
const findUserByEmail = (email) => prisma.user.findUnique({ where: { email } });
const findUserById = (id) => prisma.user.findUnique({ where: { id } });

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
