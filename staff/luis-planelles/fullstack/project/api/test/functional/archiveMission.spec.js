require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const archiveMission = require('../../logic/archiveMission');
const { cleanUp, populate, generate } = require('../helpers');
const {
  errors: { ExistenceError, ContentError },
} = require('com');
const { Mission } = require('../../data/models');

describe('archiveMission', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  const anyId = new ObjectId();

  const currentDate = new Date();
  let user, userId, missionId, explorer, participant, mission;

  beforeEach(() => {
    user = generate.user();

    userId = user._id.toString();

    explorer = generate.explorer('monkey');
    participant = generate.participant();

    mission = generate.mission(
      user,
      explorer,
      participant,
      currentDate,
      currentDate
    );

    missionId = mission._id.toString();

    return cleanUp().then(() => populate([user], [mission]));
  });

  it('success on archive mission', async function () {
    this.timeout(9000);

    await archiveMission(userId, missionId);

    const archivedMission = await Mission.findById({ _id: mission._id });

    expect(archivedMission.archived).to.equal(true);

    await archiveMission(userId, missionId);

    const archivedMissionTrue = await Mission.findById({ _id: mission._id });

    expect(archivedMissionTrue.archived).to.equal(true);
  });

  it('throws ExistenceError when user does not exist', async () => {
    const nonExistentMissionId = new ObjectId().toString();

    try {
      await archiveMission(nonExistentMissionId, missionId);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ExistenceError);
      expect(error.message).to.equal(
        `user with id ${nonExistentMissionId} not exist`
      );
    }
  });

  it('should raise ContentError if user id is empty', async () => {
    const emptyId = '';

    try {
      await archiveMission(emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is empty');
    }
  });

  it('should raise TypeError if user id is not a string', async () => {
    const noStringId = 11;

    try {
      await archiveMission(noStringId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('user id is not a string');
    }
  });

  it('should raise ContentError if user id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await archiveMission(shortId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id does not have 24 characters');
    }
  });

  it('should raise ContentError if user id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await archiveMission(nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is not hexagecimal');
    }
  });

  it('throws ExistenceError when mission does not exist', async () => {
    const nonExistentMissionId = new ObjectId().toString();

    try {
      await archiveMission(userId, nonExistentMissionId);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ExistenceError);
      expect(error.message).to.equal(
        `mission with id ${nonExistentMissionId} not exist`
      );
    }
  });

  it('should raise ContentError if mission id is empty', async () => {
    const emptyId = '';

    try {
      await archiveMission(userId, emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is empty');
    }
  });

  it('should raise TypeError if mission id is not a string', async () => {
    const noStringId = 11;

    try {
      await archiveMission(userId, noStringId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('mission id is not a string');
    }
  });

  it('should raise ContentError if mission id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await archiveMission(userId, shortId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id does not have 24 characters');
    }
  });

  it('should raise ContentError if mission id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await archiveMission(userId, nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is not hexagecimal');
    }
  });

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
