require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');

const { retrieveMission } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');

describe('retrieveMission', () => {
  before(() => {
    return mongoose.connect(process.env.MONGODB_URL);
  });

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

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
