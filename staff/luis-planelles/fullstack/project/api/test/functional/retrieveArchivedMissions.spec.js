require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { retrieveArchivedMissions } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');

const {
  errors: { ExistenceError, ContentError },
} = require('com');

describe('retrieveArchivedMissions', () => {
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
      currentDate,
      [],
      true
    );

    return cleanUp().then(() => populate([user], [mission1, mission2]));
  });

  it('success on retrieve archived mission when archived is true', async function () {
    this.timeout(9000);

    const retrievedMission = await retrieveArchivedMissions(userId);

    expect(retrievedMission.length).to.equal(1);
    expect(retrievedMission[0].traveler[0].race).to.equal(explorer.race);
    expect(retrievedMission[0].traveler[0].health).to.equal(explorer.health);
    expect(retrievedMission[0].traveler[0].food).to.equal(explorer.food);
    expect(retrievedMission[0].traveler[0].water).to.equal(explorer.water);
    expect(retrievedMission[0].traveler[0].stress).to.equal(explorer.stress);
    expect(retrievedMission[0].traveler[0].oxygen).to.equal(explorer.oxygen);
    expect(retrievedMission[0].destination).to.equal('moon');
    expect(retrievedMission[0].status).to.equal('in_progress');
    expect(retrievedMission[0].lastUpdate).to.deep.equal(mission2.lastUpdate);
    expect(retrievedMission[0].startDate).to.deep.equal(mission2.startDate);
    expect(retrievedMission[0].endDate).to.deep.equal(mission2.endDate);
    expect(retrievedMission[0].participants[0].name).to.equal(participant.name);
    expect(retrievedMission[0].loserPrice).to.equal('beer');
    expect(retrievedMission[0].archived).to.equal(true);

    expect(retrievedMission[0].id).to.be.undefined;
    expect(retrievedMission[0].creator).to.be.undefined;
    expect(retrievedMission[0].__v).to.be.undefined;
  });

  it('should no return archived mission is user isnt creator', async function () {
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

    const retrievedMissions = await retrieveArchivedMissions(userId);
    expect(retrievedMissions).to.deep.equal([]);
  });

  it('throws ExistenceError when user does not exist', async () => {
    const nonExistentUserId = new ObjectId().toString();

    try {
      await retrieveArchivedMissions(nonExistentUserId);
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
      await retrieveArchivedMissions(emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is empty');
    }
  });

  it('should raise TypeError if user id is not a string', async () => {
    const noStringId = 11;

    try {
      await retrieveArchivedMissions(noStringId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('user id is not a string');
    }
  });

  it('should raise ContentError if user id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await retrieveArchivedMissions(shortId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id does not have 24 characters');
    }
  });

  it('should raise ContentError if user id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await retrieveArchivedMissions(nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is not hexagecimal');
    }
  });

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
