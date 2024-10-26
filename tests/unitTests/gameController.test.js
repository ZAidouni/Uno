const httpMocks = require('./../../server/node_modules/node-mocks-http'); 
const createError = require('./../../server/node_modules/http-errors');
const mongoose = require('mongoose');

const { getAll, getOne, create, getGamesInProgress } = require('./../../server/controllers/gameController'); 

const UserMg = require('./../../server/db/mongo/models/userModel'); 
const HandMg = require('./../../server/db/mongo/models/handModel');
const GameMg = require('./../../server/db/mongo/models/gameModel');
const CardMg = require('./../../server/db/mongo/models/cardModel');

jest.mock('./../../server/db/mongo/models/userModel'); 
jest.mock('./../../server/db/mongo/models/handModel'); 
jest.mock('./../../server/db/mongo/models/gameModel'); 
jest.mock('./../../server/db/mongo/models/cardModel'); 

describe('gameController', () => {

  describe('getAll', () => {
    it('should return all games', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();

      const mockGames = [{ _id: mongoose.Types.ObjectId(), name: 'Game 1' }, { _id: mongoose.Types.ObjectId(), name: 'Game 2' }];
      GameMg.find = jest.fn().mockResolvedValue(mockGames);

      await getAll(req, res, next);

      expect(res._getData()).toEqual(mockGames);
      expect(next).toHaveBeenCalledTimes(0);
    });

    it('should return error when an exception is thrown', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();

      GameMg.find = jest.fn().mockImplementation(() => { throw new Error('Server Error'); });

      await getAll(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

    describe('getOne', () => {
        it('should return a game', async () => {
            const req = httpMocks.createRequest({
            params: {
                id: mongoose.Types.ObjectId(),
            },
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();
    
            const mockGame = { _id: mongoose.Types.ObjectId(), name: 'Game 1' };
            GameMg.findById = jest.fn().mockResolvedValue(mockGame);
    
            await getOne(req, res, next);
    
            expect(res._getData()).toEqual(mockGame);
            expect(next).toHaveBeenCalledTimes(0);
        });
    
        it('should return error when an exception is thrown', async () => {
            const req = httpMocks.createRequest({
            params: {
                id: mongoose.Types.ObjectId(),
            },
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();
    
            GameMg.findById = jest.fn().mockImplementation(() => { throw new Error('Server Error'); });
    
            await getOne(req, res, next);
    
            expect(next).toHaveBeenCalledTimes(1);
        });
        }
    );

    describe('create', () => {
        it('should create a game', async () => {
            const req = httpMocks.createRequest({
            body: {
                name: 'Game 1',
            },
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();
    
            const mockGame = { _id: mongoose.Types.ObjectId(), name: 'Game 1' };
            GameMg.create = jest.fn().mockResolvedValue(mockGame);
    
            await create(req, res, next);
    
            expect(res._getData()).toEqual(mockGame);
            expect(next).toHaveBeenCalledTimes(0);
        });
    
        it('should return error when an exception is thrown', async () => {
            const req = httpMocks.createRequest({
            body: {
                name: 'Game 1',
            },
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();
    
            GameMg.create = jest.fn().mockImplementation(() => { throw new Error('Server Error'); });
    
            await create(req, res, next);
    
            expect(next).toHaveBeenCalledTimes(1);
        });
    }
    );

    describe('startGame', () => {
        it('should start a game', async () => {
            const req = httpMocks.createRequest({
            body: {
                name: 'Game 1',
            },
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();
    
            const mockGame = { _id: mongoose.Types.ObjectId(), name: 'Game 1' };
            GameMg.create = jest.fn().mockResolvedValue(mockGame);
    
            await create(req, res, next);
    
            expect(res._getData()).toEqual(mockGame);
            expect(next).toHaveBeenCalledTimes(0);
        });
    
        it('should return error when an exception is thrown', async () => {
            const req = httpMocks.createRequest({
            body: {
                name: 'Game 1',
            },
            });
            const res = httpMocks.createResponse();
            const next = jest.fn();
    
            GameMg.create = jest.fn().mockImplementation(() => { throw new Error('Server Error'); });
    
            await create(req, res, next);
    
            expect(next).toHaveBeenCalledTimes(1);
        });
    }
    );

    describe('getGamesInProgress', () => {
        it('should return all games in progress', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = jest.fn();
    
            const mockGames = [{ _id: mongoose.Types.ObjectId(), name: 'Game 1' }, { _id: mongoose.Types.ObjectId(), name: 'Game 2' }];
            GameMg.find = jest.fn().mockResolvedValue(mockGames);
    
            await getGamesInProgress(req, res, next);
    
            expect(res._getData()).toEqual(mockGames);
            expect(next).toHaveBeenCalledTimes(0);
        });
    
        it('should return error when an exception is thrown', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = jest.fn();
    
            GameMg.find = jest.fn().mockImplementation(() => { throw new Error('Server Error'); });
    
            await getGamesInProgress(req, res, next);
    
            expect(next).toHaveBeenCalledTimes(1);
        });
    }
    );

    describe('getGamesCompleted', () => {
        it('should return all games completed', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = jest.fn();
    
            const mockGames = [{ _id: mongoose.Types.ObjectId(), name: 'Game 1' }, { _id: mongoose.Types.ObjectId(), name: 'Game 2' }];
            GameMg.find = jest.fn().mockResolvedValue(mockGames);
    
            await getGamesCompleted(req, res, next);
    
            expect(res._getData()).toEqual(mockGames);
            expect(next).toHaveBeenCalledTimes(0);
        });
    
        it('should return error when an exception is thrown', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = jest.fn();
    
            GameMg.find = jest.fn().mockImplementation(() => { throw new Error('Server Error'); });
    
            await getGamesCompleted(req, res, next);
    
            expect(next).toHaveBeenCalledTimes(1);
        });
    }
    ); 
});
