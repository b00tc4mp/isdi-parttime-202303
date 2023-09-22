require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');

const { generateToken } = require('../../handlers/helpers');
const { cleanUp, populate, generate } = require('../helpers');

describe('API routes', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  const baseURL = `http://localhost:${process.env.PORT}`;

  describe('hello API', () => {
    it('should return a successful response for GET endpoint/', async () => {
      const res = await fetch(baseURL + '/');
      const resBody = await res.text();

      expect(res.status).to.equal(200);
      expect(resBody).to.equal('Hello, Space Poursuit.v1!');
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

  describe('user login', () => {
    let user;

    beforeEach(() => {
      user = generate.user();

      return cleanUp().then(() => populate([user]));
    });

    it('should return a successful response for Post endpoint with valid user registration', async () => {
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

    it('should return an error response for Post endpoint with invalid email format', async () => {
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

    it('should return an error response for Post endpoint with non existence email', async () => {
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

    it('should return an error response for Post endpoint with invalid password', async () => {
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

    it('should return an error response for Post endpoint with no match password', async () => {
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

  describe('create mission', () => {
    let user, participant, traveler, token;

    let initialDate = new Date();

    let unexploredPlanet = new Date(initialDate);
    unexploredPlanet.setDate(initialDate.getDate() + 7);

    beforeEach(() => {
      user = generate.user();
      participant = generate.participant();
      traveler = 'monkey';
      token = generateToken(user._id.toString());

      return cleanUp().then(() => populate([user]));
    });

    it('should return a successful response for Post endpoint with valid mission creation', async () => {
      let missionJSON = {
        traveler,
        destination: 'unexplored_planet',
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

    it('should return an error response for Post endpoint with missing token', async () => {
      let missionJSON = {
        traveler,
        destination: 'unexplored_planet',
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

    it('should return an error response for Post endpoint with invalid token', async () => {
      let missionJSON = {
        traveler,
        destination: 'unexplored_planet',
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

  describe('retrieve mission', () => {
    let mission;

    beforeEach(() => {
      const user = generate.user();
      const explorer = generate.explorer('monkey');
      const participant = generate.participant();

      mission = generate.mission(user, explorer, participant);

      return cleanUp().then(() => populate([], [mission]));
    });

    it('should return a succesfull response for GET endpoint', async () => {
      const res = await fetch(baseURL + `/missions/${mission._id.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(res.status).to.equal(200);
    });

    it('should return a 406 Not Found response for GET endpoint with a non-existent mission', async () => {
      const nonExistentMissionId = 'non_existent_id';

      const res = await fetch(baseURL + `/missions/${nonExistentMissionId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      expect(res.status).to.equal(406);
    });
  });

  describe('update mission', () => {
    let user, mission;

    beforeEach(() => {
      const explorer = generate.explorer('monkey');
      const participant = generate.participant();

      user = generate.user();
      mission = generate.mission(user, explorer, participant);

      return cleanUp().then(() => populate([user], [mission]));
    });

    it('should return a succesfull response for PATCH endpoint', async () => {
      const res = await fetch(
        baseURL + `/missions/update/${mission._id.toString()}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      expect(res.status).to.equal(204);
    });

    it('should return a 406 Not Found response for PATCH endpoint with a non-existent mission', async () => {
      const nonExistentMissionId = 'non_existent_id';

      const res = await fetch(
        baseURL + `/missions/update/${nonExistentMissionId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      expect(res.status).to.equal(406);
    });
  });

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
