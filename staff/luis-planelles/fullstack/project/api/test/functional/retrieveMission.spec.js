require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { retrieveMission } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');

const {
  errors: { ExistenceError, ContentError },
} = require('com');

describe('retrieveMission', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  let user, explorer, participant, mission;

  beforeEach(() => {
    user = generate.user();

    explorer = generate.explorer('monkey');
    participant = generate.participant();

    mission = generate.mission(user, explorer, participant);

    return cleanUp().then(() => populate([user], [mission]));
  });

  it('success on retrieve mission', async () => {
    const retrievedMission = await retrieveMission(
      user._id.toString(),
      mission._id.toString()
    );

    expect(retrievedMission._id).to.deep.equal(mission._id);
    expect(retrievedMission.creator._id).to.deep.equal(user._id);
    expect(retrievedMission.traveler[0].race).to.equal(explorer.race);
    expect(retrievedMission.traveler[0].health).to.equal(explorer.health);
    expect(retrievedMission.traveler[0].food).to.equal(explorer.food);
    expect(retrievedMission.traveler[0].water).to.equal(explorer.water);
    expect(retrievedMission.traveler[0].stress).to.equal(explorer.stress);
    expect(retrievedMission.traveler[0].oxygen).to.equal(explorer.oxygen);
    expect(retrievedMission.destination).to.equal('moon');
    expect(retrievedMission.status).to.equal('in_progress');
    expect(retrievedMission.lastUpdate).to.deep.equal(mission.lastUpdate);
    expect(retrievedMission.startDate).to.deep.equal(mission.startDate);
    expect(retrievedMission.endDate).to.deep.equal(mission.endDate);
    expect(retrievedMission.participants[0].name).to.equal(participant.name);
    expect(retrievedMission.loserPrice).to.equal('beer');

    expect(retrievedMission.__v).to.be.undefined;
    expect(retrievedMission.participants[0].email).to.be.undefined;
    expect(retrievedMission.participants[0]._id).to.be.undefined;
    expect(retrievedMission.traveler[0]._id).to.be.undefined;
  });

  it('throws ExistenceError when user does not exist', async () => {
    const nonExistentUserId = new ObjectId().toString();

    try {
      await retrieveMission(nonExistentUserId, mission._id.toString());
    } catch (error) {
      expect(error).to.be.an.instanceOf(ExistenceError);
      expect(error.message).to.equal(
        `user with id ${nonExistentUserId} not exist`
      );
    }
  });

  it('throws ExistenceError when mission does not exist', async () => {
    const nonExistentMissionId = new ObjectId().toString();

    try {
      await retrieveMission(user._id.toString(), nonExistentMissionId);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ExistenceError);
      expect(error.message).to.equal(
        `mission with id ${nonExistentMissionId} not exist`
      );
    }
  });

  it('should raise ContentError if user id is empty', async () => {
    const emptyId = '';

    try {
      await retrieveMission(emptyId, mission._id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is empty');
    }
  });

  it('should raise TypeError if user id is not a string', async () => {
    const noStringId = 11;

    try {
      await retrieveMission(noStringId, mission._id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('user id is not a string');
    }
  });

  it('should raise ContentError if user id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await retrieveMission(shortId, mission._id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id does not have 24 characters');
    }
  });

  it('should raise ContentError if user id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await retrieveMission(nonHexId, mission._id.toString());
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is not hexagecimal');
    }
  });

  it('should raise ContentError if mission id is empty', async () => {
    const emptyId = '';

    try {
      await retrieveMission(user._id.toString(), emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is empty');
    }
  });

  it('should raise TypeError if mission id is not a string', async () => {
    const noStringId = 11;

    try {
      await retrieveMission(user._id.toString(), noStringId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('mission id is not a string');
    }
  });

  it('should raise ContentError if mission id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await retrieveMission(user._id.toString(), shortId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id does not have 24 characters');
    }
  });

  it('should raise ContentError if mission id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await retrieveMission(user._id.toString(), nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is not hexagecimal');
    }
  });

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
