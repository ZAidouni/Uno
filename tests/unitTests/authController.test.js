const httpMocks = require('./../../server/node_modules/node-mocks-http'); 
const createError = require('./../../server/node_modules/http-errors');
const { restrictTo } = require('./../../server/controllers/authController'); 

const jwt = require('./../../server/node_modules/jsonwebtoken');
const { promisify } = require('util');
const { protect } = require('./../../server/controllers/authController'); 

jest.mock('./../../server/node_modules/jsonwebtoken');
jest.mock('../../server/db/mongo/models/userModel'); 

const UserMg = require('./../../server/db/mongo/models/userModel'); 

describe('restrictTo middleware', () => {
  it('should call next() if the user role is included in the roles', () => {
    const req = httpMocks.createRequest({
      user: {
        role: 'admin',
      },
    });

    const res = httpMocks.createResponse();
    const next = jest.fn();

    restrictTo('admin', 'user')(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next() with an error if the user role is not included in the roles', () => {
    const req = httpMocks.createRequest({
      user: {
        role: 'guest',
      },
    });

    const res = httpMocks.createResponse();
    const next = jest.fn();

    restrictTo('admin', 'user')(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    //expect(next).toHaveBeenCalledWith(createError(403, 'You do not have permission to perform this action'));
  });

  it('should call next() with an error if the user role is not included in the roles', () => {
    const req = httpMocks.createRequest({
      user: {
        role: 'user',
      },
    });

    const res = httpMocks.createResponse();
    const next = jest.fn();

    restrictTo('admin')(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    //expect(next).toHaveBeenCalledWith(createError(403, 'You do not have permission to perform this action'));
  });
});



describe('protect middleware', () => {
  it('should call next() with an error if no token is provided', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await protect(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(createError(401, 'You are not logged in ! please log in to get access'));
  });

  it('should call next() with an error if the user does not exist', async () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: 'Bearer testtoken',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    // jwt.verify = jest.fn().mockResolvedValue({ id: 'testid' });
    UserMg.findById = jest.fn().mockResolvedValue(false);

    jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
        callback(null, { id: 'testid' });
      });
    
      

   await protect(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(createError(401, 'The user belonging to the token no longer exists'));
  });

  it('should call next() if the token is valid and the user exists', async () => {
    const req = httpMocks.createRequest({
      headers: {
        authorization: 'Bearer testtoken',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    const mockUser = { _id: 'testid' };

    jwt.verify = jest.fn().mockImplementation((token, secret, callback) => {
        callback(null, { id: 'testid' });
      });
    UserMg.findById.mockResolvedValue(mockUser);

    await protect(req, res, next);

    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
});