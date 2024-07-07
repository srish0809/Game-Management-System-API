const express = require('express');
const scoreController = require('../controllers/score.controller');
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Scores
 *   description: Score management
 */

/**
 * @swagger
 * /scores:
 *   post:
 *     summary: Add a new score
 *     tags: [Scores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               gameId:
 *                 type: string
 *               score:
 *                 type: integer
 *             required:
 *               - userId
 *               - gameId
 *               - score
 *     responses:
 *       201:
 *         description: Score added successfully
 *       400:
 *         description: Bad request
 */
router.post('/', authMiddleware, rbacMiddleware('Player'), scoreController.addScore);

/**
 * @swagger
 * /scores/user/{userId}:
 *   get:
 *     summary: Get scores by user ID
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of scores for the user
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', authMiddleware, scoreController.getScoresByUser);

/**
 * @swagger
 * /scores/game/{gameId}:
 *   get:
 *     summary: Get scores by game ID
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         schema:
 *           type: string
 *         required: true
 *         description: Game ID
 *     responses:
 *       200:
 *         description: List of scores for the game
 *       500:
 *         description: Internal server error
 */
router.get('/game/:gameId', authMiddleware, scoreController.getScoresByGame);

module.exports = router;
