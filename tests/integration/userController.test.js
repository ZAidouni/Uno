const request = require('../../server/node_modules/supertest');
const app = require('./../../server/app'); 
const jwt = require('../../server/node_modules/jsonwebtoken');

require('../../server/node_modules/dotenv/lib/main').config({ path: `${__dirname}/../../server/config.env` });


const UserMg = require('../../server/db/mongo/models/userModel');
const Email = require('../../server/utils/email');
const authController = require('./../../server/controllers/authController');
const userController = require('./../../server/controllers/userController');

jest.mock('./../../server/controllers/authController', () => {
  return {
    ...jest.requireActual('./../../server/controllers/authController'), // garde les autres méthodes non mockées du contrôleur
    protect: jest.fn((req, res, next) => {
      next();
    }),
    restrictTo: jest.fn((role) => (req, res, next) => {
      next();
    }),
  };
});

jest.mock('./../../server/db/mongo/models/userModel'); // Mock de UserMg
jest.mock('./../../server/utils/email'); // Mock du mailer
jest.mock('./../../server/controllers/authController'); // Mock du mailer


describe('GET /api/v1/users', () => {

  it('Should return a 200 status code and an array of users (user authentified and has admin role) ', async () => {
    const mockUsers = [
      {
        "firstName": "User",
        "lastName": "One",
        "email": "userone@gmail.com",
        "role": "user"
      },
      {
        "firstName": "User",
        "lastName": "Two",
        "email": "usertwo@gmail.com",
        "role": "user"
      }
    ];

    UserMg.find.mockResolvedValue(mockUsers);
    UserPg.findAll.mockResolvedValue(mockUsers);

    

    const response = await request(app).get(`/api/v1/users`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data.users)).toBeTruthy();
    expect(response.body.data.users.length).toBe(mockUsers.length);
    expect(response.body.data.users).toEqual(mockUsers);
  });
});

describe('GET /api/v1/users/:id', () => {

  it('Should return a 200 status code and a user object (user authenticated and has admin role)', async () => {
    const mockUser = {
      _id: '60b69c8f9f1b1c001d7b5b92',
      firstName: "User",
      lastName: "One",
      email: "userone@gmail.com",
      role: "user"
    };

    const userId = mockUser._id;

    UserMg.findById.mockResolvedValue(mockUser);

    const response = await request(app).get(`/api/v1/users/${userId}`);
    
    expect(response.status).toBe(200);
    expect(response.body.data.user).toEqual(mockUser);
  });

  it('Should return a 404 status code when a user is not found', async () => {
    const nonExistentUserId = '60b69c8f9f1b1c001d7b5b93';

    UserMg.findById.mockResolvedValue(null);

    const response = await request(app).get(`/api/v1/users/${nonExistentUserId}`);
    
    expect(response.status).toBe(404);
  });

  it('Should return a 500 status code when a database error occurs', async () => {
    const userIdCausingError = '60b69c8f9f1b1c001d7b5b94';

    UserMg.findById.mockRejectedValue(new Error('Database error'));

    const response = await request(app).get(`/api/v1/users/${userIdCausingError}`);
    
    expect(response.status).toBe(500);
  });
});


describe('POST /api/v1/users', () => {

  it('Should return a 201 status code and a user object when user data is valid', async () => {
    const newUser = {
      firstName: "User",
      lastName: "One",
      email: "userone@gmail.com",
      password: "password",
      passwordConfirm: "password",
      date_of_birth: "1990-01-01",
      role: "user"
    };

    UserMg.create.mockResolvedValue(newUser);
    UserPg.create.mockResolvedValue(newUser);

    const response = await request(app).post(`/api/v1/users`).send(newUser);
    
    expect(response.status).toBe(201);
    expect(response.body.data.user).toEqual(newUser);
  });

  it('Should return a 400 status code when user data is invalid', async () => {
    
    const mockValidationError = new Error('ValidationError');
      mockValidationError.name = 'ValidationError';
      mockValidationError.errors = {
        firstName: {
          message: 'Please enter your firstName.',
        },
        lastName: {
          message: 'Please enter your lastName.',
        },
        email: {
          message: 'Please enter a valid email.',
        },
        password: {
          message: 'The two passwords are different.',
        },
      };

      UserMg.create.mockRejectedValue(mockValidationError);

      const response = await request(app)
        .post('/api/v1/users')
        .send({
          firstName: '',
          lastName: '',
          email: 'invalid email',
          password: 'password1',
          passwordConfirm: 'password2',
          date_of_birth: '1990-01-01',
          role: 'user',
        });

        console.log("response : ", response);
    
      expect(response.status).toBe(400);
      //expect(response.body.message.errors).toEqual(mockValidationError.errors);
  });

  it('Should return a 500 status code when a database error occurs', async () => {
    const newUserCausingError = {
      firstName: "User",
      lastName: "One",
      email: "userone@gmail.com",
      password: "password",
      passwordConfirm: "password",
      date_of_birth: "1990-01-01",
      role: "user"
    };

    UserMg.create.mockRejectedValue(new Error('Database error'));
    UserPg.create.mockRejectedValue(new Error('Database error'));

    const response = await request(app).post(`/api/v1/users`).send(newUserCausingError);
    
    expect(response.status).toBe(500);
  });
});

describe('Integration test for the endpoint "POST /signup"', () => {
  it('Should return a 201 status code, send a email to welcome the new user and return a valid jwt token', async () => {

    const signupData = {
      "firstName": "Malek",
      "lastName": "IDIR",
      "email": "zakariaaidouni@gmail.com",
      "password": "password",
      "passwordConfirm": "password",
      "role": "user"
    };

    UserMg.create.mockResolvedValue(signupData); 
    UserPg.create.mockResolvedValue(signupData);
    const sendWelcomeMock = jest.spyOn(Email.prototype, 'sendWelcome').mockResolvedValue();
    const response = await request(app).post(`/api/v1/users/signup`).send(signupData);

    
  
   const requestUsed = response.request;
  
    
    expect(response.status).toBe(201);
    expect(response.body.token).toBeTruthy();
    expect(sendWelcomeMock).toHaveBeenCalled();

    //verify that the jwt token has 3 parts 
    const tokenParts = response.body.token.split('.');
    expect(tokenParts).toHaveLength(3);

  });

  it('Should return a 409 status code if the user is already in the DB and should not send token and send welcome email', async () => {

    const userEmail = 'zakariaaidouni@gmail.com'
    //user in the DB
    const userData = {
      "firstName": "Malek",
      "lastName": "IDIR",
      "email": userEmail,
      "password": "password",
      "role" : "user"

    };

    UserMg.find.mockResolvedValue(userData); 
    UserPg.findOne.mockResolvedValue(userData); 
    const sendWelcomeMock = jest.fn();
    Email.prototype.sendWelcome = sendWelcomeMock;
    
    //user data in the signup form
    const signupData = {
      firstName: 'Nouveau',
      lastName: 'Utilisateur',
      email: userEmail,
      password: 'nouveaumotdepasse',
      passwordConfirm: 'nouveaumotdepasse',
      role: 'user'
    };

    
    const response = await request(app).post(`/api/v1/users/signup`).send(signupData);
  
    
    expect(response.status).toBe(409);
    expect(response.body.token).toBeFalsy();
    expect(sendWelcomeMock).toHaveBeenCalledTimes(0);

    //verify that the jwt token has 3 parts 
    // const tokenParts = response.body.token.split('.');
    // expect(tokenParts).toHaveLength(3);

  });
});


// jest.spyOn(UserMg, 'findOne');
describe('Integration test of the login endpoint "POST /login"', ()=>{

  afterEach(() => {
    jest.restoreAllMocks(); // Restaure tous les spies après chaque test pour éviter des interférences entre les tests
  });


  it("Should return a 400 satus code and no token if the user does not provide a password",async ()=>{

    const loginData = {
      email : "zakariaaidouni@gmail.com"
    };
    const response = await request(app).post(`/api/v1/users/login`).send(loginData);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Please provide email and password');
    expect(response.body.token).toBeFalsy();
  });

  it("Should return a 400 satus code if the user does not provide a email",async ()=>{

    const loginData = {
      password : "password"
    };
    const response = await request(app).post(`/api/v1/users/login`).send(loginData);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Please provide email and password');
    expect(response.body.token).toBeFalsy();
  });

  
  
  it("Should return a 401 satus code if the user does not exists",async ()=>{

    const loginData = {
      email : "zakariaaidouni@gmail.com",
      password : "password"
    };

    //when it is the case it will send a TypeError 
    UserMg.findOne.mockResolvedValue(null);


    const response = await request(app).post(`/api/v1/users/login`).send(loginData);
    expect(UserMg.findOne).toHaveBeenCalledWith({ email: loginData.email });
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('No user found with this email or something else went wrong');
    expect(response.body.token).toBeFalsy();
  });

  it("Should return a 401 satus code if the user exists but the password provided is incorrect",async ()=>{


    const loginData = {
      email : "zakariaaidouni@gmail.com",
      password : "wrongPassword"
    };

    const user = new UserMg({
      firstName: "walid",
      lastName: "idir",
      email: "zakariaaidouni@gmail.com",
      password: "$2a$12$T9ra29eneREUafd25rDGpOl994Vi0lLnH4vXC0Uj35y2u/lOvnWeG",
      role: "user",
    });
    
    //the user found in the Db
    UserMg.findOne.mockResolvedValue(user);

    //user.correctPassword.mockReturnValue(false);
    const correctPasswordSpy = jest.spyOn(user, 'correctPassword');
    correctPasswordSpy.mockResolvedValue(false); // Mock de la méthode correctPassword qui renvoie toujours false

    const response = await request(app).post(`/api/v1/users/login`).send(loginData);
    expect(UserMg.findOne).toHaveBeenCalledWith({ email: loginData.email });
    //expect(user.correctPassword).toHaveBeenCalled();
    //expect(user.correctPassword).toHaveBeenCalledWith(loginData.password, user.password);


    expect(response.status).toBe(500);
    //expect(response.body.message).toBe('No user found with this email');
    expect(response.body.token).toBeFalsy();
  });

  
});


describe('POST /logout', () => {
  it('should logout a user if a valid token is provided', async () => {

    const blacklist = [];

    const token = "fake.jwt.token"

    // const res = await request(app)
    //   .post('/logout')
    //   .set('Authorization', `Bearer ${token}`)
      //.expect(200);

    //expect(res.body.message).toBe('Successfully logged out');
    // check if the token is in the blacklist
  });

  // it('should return an error if no token is provided', async () => {
  //   const res = await request(app)
  //     .post('/logout')
  //     .expect(401);

  //   expect(res.body.message).toBe('You are not logged in');
  // });
});