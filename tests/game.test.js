const gameService = require('../services/game.service');
const gameModel = require('../models/game.model');

jest.mock('../models/game.model');

describe('Game Service', () => {
  describe('createGame', () => {
    it('should create a game with the correct release date format', async () => {
      const gameData = { name: 'Test Game', releaseDate: '2022-01-01' };
      const createdGame = { id: '1', ...gameData };

      gameModel.createGame.mockResolvedValue(createdGame);

      const result = await gameService.createGame(gameData);

      expect(gameModel.createGame).toHaveBeenCalledWith({
        name: 'Test Game',
        releaseDate: new Date('2022-01-01').toISOString(),
      });
      expect(result).toEqual(createdGame);
    });
  });

  describe('getAllGames', () => {
    it('should fetch all games with pagination', async () => {
      const games = [{ id: '1', name: 'Test Game' }];
      gameModel.getAllGames.mockResolvedValue(games);

      const result = await gameService.getAllGames(1, 10);

      expect(gameModel.getAllGames).toHaveBeenCalledWith(1, 10);
      expect(result).toEqual(games);
    });
  });

  describe('getGameById', () => {
    it('should return the game if found', async () => {
      const game = { id: '1', name: 'Test Game' };
      gameModel.getGameById.mockResolvedValue(game);

      const result = await gameService.getGameById('1');

      expect(gameModel.getGameById).toHaveBeenCalledWith('1');
      expect(result).toEqual(game);
    });

    it('should throw an error if the game is not found', async () => {
      gameModel.getGameById.mockResolvedValue(null);

      await expect(gameService.getGameById('1')).rejects.toThrow('Game not found');
    });
  });

  describe('updateGame', () => {
    it('should update the game with the correct release date format if provided', async () => {
      const game = { id: '1', name: 'Test Game', releaseDate: '2022-01-01T00:00:00.000Z' };
      const updatedData = { name: 'Updated Test Game', releaseDate: '2022-02-01' };
      const updatedGame = { id: '1', ...updatedData, releaseDate: new Date(updatedData.releaseDate).toISOString() };

      gameModel.getGameById.mockResolvedValue(game);
      gameModel.updateGame.mockResolvedValue(updatedGame);

      const result = await gameService.updateGame('1', updatedData);

      expect(gameModel.getGameById).toHaveBeenCalledWith('1');
      expect(gameModel.updateGame).toHaveBeenCalledWith('1', {
        name: 'Updated Test Game',
        releaseDate: new Date('2022-02-01').toISOString(),
      });
      expect(result).toEqual(updatedGame);
    });

    it('should throw an error if the game is not found', async () => {
      gameModel.getGameById.mockResolvedValue(null);

      await expect(gameService.updateGame('1', { name: 'Updated Test Game' })).rejects.toThrow('Game not found');
    });
  });

  describe('deleteGame', () => {
    it('should delete the game if found', async () => {
      const game = { id: '1', name: 'Test Game' };

      gameModel.getGameById.mockResolvedValue(game);
      gameModel.deleteGame.mockResolvedValue(true);

      const result = await gameService.deleteGame('1');

      expect(gameModel.getGameById).toHaveBeenCalledWith('1');
      expect(gameModel.deleteGame).toHaveBeenCalledWith('1');
      expect(result).toBe(true);
    });

    it('should throw an error if the game is not found', async () => {
      gameModel.getGameById.mockResolvedValue(null);

      await expect(gameService.deleteGame('1')).rejects.toThrow('Game not found');
    });
  });
});
