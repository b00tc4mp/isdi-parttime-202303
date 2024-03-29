require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { retrieveMissions } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');

const {
  errors: { ExistenceError, ContentError },
} = require('com');
const { Mission } = require('../../data/models');

describe('retrieveMissions', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  const currentDate = new Date();
  let user, userId, explorer, participant, mission1, mission2;

  beforeEach(() => {
    user = generate.user();

    userId = user._id.toString();

    explorer = generate.explorer('monkey');
    participant = generate.participant();

    mission1 = generate.mission(
      user,
      explorer,
      participant,
      currentDate,
      currentDate
    );

    mission2 = generate.mission(
      user,
      explorer,
      participant,
      currentDate,
      currentDate
    );

    return cleanUp().then(() => populate([user], [mission1, mission2]));
  });

  it('success on retrieve mission', async function () {
    this.timeout(9000);

    const retrievedMissions = await retrieveMissions(userId);

    retrievedMissions.map((mission, index) => {
      const expectedMission = index === 0 ? mission1 : mission2;

      expect(mission.traveler[0].race).to.equal(explorer.race);
      expect(mission.traveler[0].health).to.equal(explorer.health);
      expect(mission.traveler[0].food).to.equal(explorer.food);
      expect(mission.traveler[0].water).to.equal(explorer.water);
      expect(mission.traveler[0].stress).to.equal(explorer.stress);
      expect(mission.traveler[0].oxygen).to.equal(explorer.oxygen);
      expect(mission.destination).to.equal('moon');
      expect(mission.status).to.equal('in_progress');
      expect(mission.lastUpdate).to.deep.equal(expectedMission.lastUpdate);
      expect(mission.startDate).to.deep.equal(expectedMission.startDate);
      expect(mission.endDate).to.deep.equal(expectedMission.endDate);
      expect(mission.participants[0].name).to.equal(participant.name);
      expect(mission.loserPrice).to.equal('beer');

      expect(mission.id).to.be.undefined;
      expect(mission.creator).to.be.undefined;
      expect(mission.__v).to.be.undefined;
    });
  });

  it('success on retrieve mission is user is creator', async function () {
    this.timeout(9000);

    await cleanUp();

    const otherUser = generate.user();
    const missionOtherCreator = generate.mission(
      otherUser,
      explorer,
      participant,
      currentDate,
      currentDate
    );

    await populate([user], [missionOtherCreator]);

    const retrievedMissions = await retrieveMissions(userId);
    expect(retrievedMissions).to.deep.equal([]);
  });

  it('should call updateMission when endDate is more than events date', async function () {
    this.timeout(9000);

    const planetShock = generate.nasaEvent('planetShock', new Date());
    const massEjection = generate.nasaEvent('massEjection', new Date());

    await populate([], [], [planetShock, massEjection]);

    const retrievedMissions = await retrieveMissions(userId);

    retrievedMissions.map((mission) => {
      expect(mission.traveler[0].health).to.equal(71.67);
      expect(mission.traveler[0].food).to.equal(60);
      expect(mission.traveler[0].water).to.equal(85);
      expect(mission.traveler[0].stress).to.equal(70);
      expect(mission.traveler[0].oxygen).to.equal(100);
    });
  });

  it('should not call updateMission when status is success', async function () {
    this.timeout(9000);

    let missionsfound = await Mission.find();

    missionsfound.forEach(async (mission) => {
      mission.status = 'success';
      await mission.save();
    });

    const planetShock = generate.nasaEvent('planetShock', new Date());
    const massEjection = generate.nasaEvent('massEjection', new Date());

    await populate([], [], [planetShock, massEjection], []);

    const retrievedMissions = await retrieveMissions(userId);

    retrievedMissions.map((mission) => {
      expect(mission.traveler[0].health).to.equal(100);
      expect(mission.traveler[0].food).to.equal(100);
      expect(mission.traveler[0].water).to.equal(100);
      expect(mission.traveler[0].stress).to.equal(100);
      expect(mission.traveler[0].oxygen).to.equal(100);
    });
  });

  it('should not call updateMission when status is failure', async function () {
    this.timeout(9000);

    let missionsfound = await Mission.find();

    missionsfound.forEach(async (mission) => {
      mission.status = 'failure';
      await mission.save();
    });

    const planetShock = generate.nasaEvent('planetShock', new Date());
    const massEjection = generate.nasaEvent('massEjection', new Date());

    await populate([], [], [planetShock, massEjection], []);

    const retrievedMissions = await retrieveMissions(userId);

    retrievedMissions.map((mission) => {
      expect(mission.traveler[0].health).to.equal(100);
      expect(mission.traveler[0].food).to.equal(100);
      expect(mission.traveler[0].water).to.equal(100);
      expect(mission.traveler[0].stress).to.equal(100);
      expect(mission.traveler[0].oxygen).to.equal(100);
    });
  });

  it('throws ExistenceError when user does not exist', async () => {
    const nonExistentUserId = new ObjectId().toString();

    try {
      await retrieveMissions(nonExistentUserId);
    } catch (error) {
      expect(error).to.be.an.instanceOf(ExistenceError);
      expect(error.message).to.equal(
        `user with id ${nonExistentUserId} not exist`
      );
    }
  });

  it('should raise ContentError if user id is empty', async () => {
    const emptyId = '';

    try {
      await retrieveMissions(emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is empty');
    }
  });

  it('should raise TypeError if user id is not a string', async () => {
    const noStringId = 11;

    try {
      await retrieveMissions(noStringId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('user id is not a string');
    }
  });

  it('should raise ContentError if user id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await retrieveMissions(shortId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id does not have 24 characters');
    }
  });

  it('should raise ContentError if user id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await retrieveMissions(nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is not hexagecimal');
    }
  });

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
