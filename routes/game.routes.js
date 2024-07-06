const express = require('express');
const gameController = require('../controllers/game.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Game management
 */

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               genre:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *             required:
 *               - name
 *               - genre
 *               - releaseDate
 *     responses:
 *       201:
 *         description: Game created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', authMiddleware, gameController.createGame);

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: List of all games
 *       500:
 *         description: Internal server error
 */
router.get('/', gameController.getAllGames);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Game ID
 *     responses:
 *       200:
 *         description: Game details
 *       404:
 *         description: Game not found
 */
router.get('/:id', gameController.getGameById);

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Game ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               genre:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Game updated successfully
 *       404:
 *         description: Game not found
 */
router.put('/:id', authMiddleware, gameController.updateGame);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Game ID
 *     responses:
 *       204:
 *         description: Game deleted successfully
 *       404:
 *         description: Game not found
 */
router.delete('/:id', authMiddleware, gameController.deleteGame);

module.exports = router;
