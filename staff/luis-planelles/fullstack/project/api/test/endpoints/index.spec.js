require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');

const { generateToken } = require('../../handlers/helpers');

const { cleanUp, populate, generate } = require('../helpers');

describe('API routes', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  const baseURL = `http://localhost:${process.env.PORT}`;

  describe('Hello API', () => {
    it('should return a successful response for GET /', async () => {
      const res = await fetch(baseURL + '/');
      const resBody = await res.text();

      expect(res.status).to.equal(200);
      expect(resBody).to.equal('Hello, Space Monkey.v1!');
    });
  });

  describe('User registration', () => {
    beforeEach(() => cleanUp());

    it('should return a successful response for valid user registration', async () => {
      let userJSON = {
        name: 'JohnDoe',
        email: 'johnDoe@email.com',
        password: 'Tes7@@@@',
      };

      const res = await fetch(baseURL + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userJSON),
      });

      expect(res.status).to.equal(201);
    });

    it('should return an error response for empty or invalid name', async () => {
      const emptyName = '';

      let invalidUserJSON = {
        name: emptyName,
        email: 'johnDoe@email.com',
        password: 'Tes7@@@@',
      };

      const res = await fetch(baseURL + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidUserJSON),
      });

      expect(res.status).to.equal(406);
    });

    it('should return an error response for invalid email format', async () => {
      const invalidEmail = 'invalid-email';

      let invalidUserJSON = {
        name: 'JohnDoe',
        email: invalidEmail,
        password: 'Tes7@@@@',
      };

      const res = await fetch(baseURL + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidUserJSON),
      });

      expect(res.status).to.equal(406);
    });

    it('should return an error response for invalid password', async () => {
      const invalidPassword = 'invalid-password';

      let invalidUserJSON = {
        name: 'JohnDoe',
        email: 'johnDoe@email.com',
        password: invalidPassword,
      };

      const res = await fetch(baseURL + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidUserJSON),
      });

      expect(res.status).to.equal(406);
    });
  });

  describe('User login', () => {
    let user;

    beforeEach(() => {
      user = generate.user();

      return cleanUp().then(() => populate([user]));
    });

    it('should return a successful response for valid user registration', async () => {
      let userJSON = {
        email: user.email,
        password: user.password,
      };

      const res = await fetch(baseURL + '/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userJSON),
      });

      expect(res.status).to.equal(200);
    });

    it('should return an error response for invalid email format', async () => {
      const invalidEmail = 'invalid-email';

      let invalidUserJSON = {
        email: invalidEmail,
        password: user.password,
      };

      const res = await fetch(baseURL + '/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidUserJSON),
      });

      expect(res.status).to.equal(406);
    });

    it('should return an error response for non existence email', async () => {
      const noMatchEmail = 'noMatch@email.com';

      let invalidUserJSON = {
        email: noMatchEmail,
        password: user.password,
      };

      const res = await fetch(baseURL + '/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidUserJSON),
      });

      expect(res.status).to.equal(404);
    });

    it('should return an error response for invalid password', async () => {
      const invalidPassword = 'invalid-password';

      let invalidUserJSON = {
        email: user.email,
        password: invalidPassword,
      };

      const res = await fetch(baseURL + '/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidUserJSON),
      });

      expect(res.status).to.equal(406);
    });

    it('should return an error response for no match password', async () => {
      const noMatchPassword = 'Nom@tchPassw0rd';

      let invalidUserJSON = {
        email: user.email,
        password: noMatchPassword,
      };

      const res = await fetch(baseURL + '/users/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidUserJSON),
      });

      expect(res.status).to.equal(401);
    });
  });

  describe('Create mission', () => {
    let user, participant, traveler, token;

    let initialDate = new Date();

    let unexploredPlanet = new Date(initialDate);
    unexploredPlanet.setDate(initialDate.getDate() + 7);

    beforeEach(() => {
      user = generate.user();
      participant = generate.participant();
      traveler = generate.explorer('monkey');
      token = generateToken(user._id.toString());

      return cleanUp().then(() => populate([user]));
    });

    it('should return a successful response for valid mission creation', async () => {
      let missionJSON = {
        traveler,
        destination: 'unexplored_planet',
        startDate: initialDate,
        endDate: unexploredPlanet,
        participants: [participant],
        loserPrice: 'beer',
      };

      const res = await fetch(baseURL + '/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(missionJSON),
      });

      expect(res.status).to.equal(201);
    });

    it('should return an error response for missing token', async () => {
      let missionJSON = {
        traveler,
        destination: 'unexplored_planet',
        startDate: initialDate,
        endDate: unexploredPlanet,
        participants: [participant],
        loserPrice: 'beer',
      };

      const res = await fetch(baseURL + '/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(missionJSON),
      });

      expect(res.status).to.equal(406);
    });

    it('should return an error response for invalid token', async () => {
      let missionJSON = {
        traveler,
        destination: 'unexplored_planet',
        startDate: initialDate,
        endDate: unexploredPlanet,
        participants: [participant],
        loserPrice: 'beer',
      };

      const invalidToken = 'invalid_token';

      const res = await fetch(baseURL + '/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${invalidToken}`,
        },
        body: JSON.stringify(missionJSON),
      });

      expect(res.status).to.equal(500);
    });
  });

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
