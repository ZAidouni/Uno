const httpMocks = require('./../../server/node_modules/node-mocks-http'); 
const createError = require('./../../server/node_modules/http-errors');
const mongoose = require('mongoose');

const { getAll, getAllbutOne } = require('./../../server/controllers/cardController'); 
const CardMg = require('./../../server/db/mongo/models/cardModel'); 

jest.mock('./../../server/db/mongo/models/cardModel'); 

describe('cardController', () => {

  describe('getAll', () => {
    it('should return all cards', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();

      const mockCards = [{ _id: mongoose.Types.ObjectId(), name: 'Card 1' }, { _id: mongoose.Types.ObjectId(), name: 'Card 2' }];
      CardMg.find = jest.fn().mockResolvedValue(mockCards);

      await getAll(req, res, next);

      expect(res._getData()).toEqual(mockCards);
      expect(next).toHaveBeenCalledTimes(0);
    });

    it('should return error when an exception is thrown', async () => {
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();
      const next = jest.fn();

      CardMg.find = jest.fn().mockImplementation(() => { throw new Error('Server Error'); });

      await getAll(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllbutOne', () => {
    it('should return all cards except the one with specified id', async () => {
      const req = httpMocks.createRequest({
        params: {
          id: mongoose.Types.ObjectId(),
        },
      });
      const res = httpMocks.createResponse();
      const next = jest.fn();

      const mockCards = [{ _id: mongoose.Types.ObjectId(), name: 'Card 1' }, { _id: mongoose.Types.ObjectId(), name: 'Card 2' }];
      CardMg.find = jest.fn().mockResolvedValue(mockCards);

      await getAllbutOne(req, res, next);

      expect(res._getData()).toEqual(mockCards);
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

      CardMg.find = jest.fn().mockImplementation(() => { throw new Error('Server Error'); });

      await getAllbutOne(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
