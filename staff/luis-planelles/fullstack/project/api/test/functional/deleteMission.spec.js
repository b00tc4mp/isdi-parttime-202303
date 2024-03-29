require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const deleteMission = require('../../logic/deleteMission');
const { cleanUp, populate, generate } = require('../helpers');
const { Mission } = require('../../data/models');

describe('deleteMission', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  const anyId = new ObjectId();

  let user, mission, missionNoAuthor, userId, missionId;

  beforeEach(() => {
    user = generate.user();
    otherUser = generate.user();
    explorer = generate.explorer('monkey');
    participant = generate.participant();

    mission = generate.mission(user, explorer, participant);
    missionNoAuthor = generate.mission(otherUser, explorer, participant);

    userId = user._id.toString();
    missionId = mission._id.toString();

    return cleanUp().then(() => populate([user], [mission, missionNoAuthor]));
  });

  it('succeeds on existing user and mission', () => {
    return cleanUp()
      .then(() => populate([user], [mission]))
      .then(() => deleteMission(userId, missionId))
      .then(() => Mission.findOne())
      .then((foundMission) => {
        expect(foundMission).to.be.null;
      });
  });

  it('fails when user not exists', () => {
    return deleteMission(anyId.toString(), missionId).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`user with id ${anyId} not exists`);
    });
  });

  it('fails when mission not exists', () => {
    return deleteMission(userId, anyId.toString()).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(`mission with id ${anyId} not exists`);
    });
  });

  it('fails when user inst author and mission exists', () => {
    return deleteMission(userId, missionNoAuthor._id.toString()).catch(
      (error) => {
        expect(error).to.be.instanceOf(Error);
        expect(error.message).to.equal(
          `mission with id ${missionNoAuthor._id.toString()} not belong to user with id ${userId}`
        );
      }
    );
  });

  it('fails on empty user id', () =>
    expect(() => deleteMission('', missionId)).to.throw(
      Error,
      'user id is empty'
    ));

  it('fails on empty mission id', () =>
    expect(() => deleteMission(userId, '')).to.throw(
      Error,
      'mission id is empty'
    ));

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
