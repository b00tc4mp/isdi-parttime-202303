require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { retrieveMission } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');

const {
  errors: { ExistenceError, ContentError },
} = require('com');
const { Mission } = require('../../data/models');

describe('retrieveMission', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  let user, explorer, participant, mission, currentDate;

  beforeEach(() => {
    user = generate.user();

    currentDate = new Date();
    explorer = generate.explorer('monkey');
    participant = generate.participant();

    mission = generate.mission(user, explorer, participant);

    return cleanUp().then(() => populate([user], [mission]));
  });

  it('success on retrieve mission', async () => {
    const retrievedMission = await retrieveMission(mission._id.toString());

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
    expect(retrievedMission.participants[0]._id).to.be.undefined;
    expect(retrievedMission.traveler[0]._id).to.be.undefined;
  });

  it('should call updateMission when endDate is more than events date', async () => {
    let foundMission = await Mission.findOne();
    foundMission.endDate = new Date(
      currentDate.getTime() + 2 * 24 * 60 * 60 * 1000
    );
    await foundMission.save();

    const planetShock = generate.nasaEvent('planetShock', new Date());
    const massEjection = generate.nasaEvent('massEjection', new Date());

    await populate([], [], [planetShock, massEjection]);

    await retrieveMission(mission._id.toString());

    foundMission = await Mission.findOne();

    expect(foundMission.traveler[0].health).to.equal(71.67);
    expect(foundMission.traveler[0].food).to.equal(60);
    expect(foundMission.traveler[0].water).to.equal(85);
    expect(foundMission.traveler[0].stress).to.equal(70);
    expect(foundMission.traveler[0].oxygen).to.equal(100);
  });

  it('should not call updateMission when status is success', async () => {
    let foundMission = await Mission.findOne();
    foundMission.status = 'success';
    foundMission.endDate = new Date(
      currentDate.getTime() + 2 * 24 * 60 * 60 * 1000
    );
    await foundMission.save();

    const planetShock = generate.nasaEvent('planetShock', new Date());
    const massEjection = generate.nasaEvent('massEjection', new Date());

    await populate([], [], [planetShock, massEjection], []);

    await retrieveMission(mission._id.toString());

    foundMission = await Mission.findOne();

    expect(foundMission.traveler[0].health).to.equal(100);
    expect(foundMission.traveler[0].food).to.equal(100);
    expect(foundMission.traveler[0].water).to.equal(100);
    expect(foundMission.traveler[0].stress).to.equal(100);
    expect(foundMission.traveler[0].oxygen).to.equal(100);
  });

  it('should not call updateMission when status is failure', async () => {
    let foundMission = await Mission.findOne();
    foundMission.status = 'failure';
    foundMission.endDate = new Date(
      currentDate.getTime() + 2 * 24 * 60 * 60 * 1000
    );
    await foundMission.save();

    const planetShock = generate.nasaEvent('planetShock', new Date());
    const massEjection = generate.nasaEvent('massEjection', new Date());

    await populate([], [], [planetShock, massEjection], []);

    await retrieveMission(mission._id.toString());

    foundMission = await Mission.findOne();

    expect(foundMission.traveler[0].health).to.equal(100);
    expect(foundMission.traveler[0].food).to.equal(100);
    expect(foundMission.traveler[0].water).to.equal(100);
    expect(foundMission.traveler[0].stress).to.equal(100);
    expect(foundMission.traveler[0].oxygen).to.equal(100);
  });

  it('throws ExistenceError when mission does not exist', async () => {
    const nonExistentMissionId = new ObjectId().toString();

    try {
      await retrieveMission(nonExistentMissionId);
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
      await retrieveMission(emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is empty');
    }
  });

  it('should raise TypeError if mission id is not a string', async () => {
    const noStringId = 11;

    try {
      await retrieveMission(noStringId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('mission id is not a string');
    }
  });

  it('should raise ContentError if mission id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await retrieveMission(shortId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id does not have 24 characters');
    }
  });

  it('should raise ContentError if mission id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await retrieveMission(nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is not hexagecimal');
    }
  });

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
