require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { createMission } = require('../../logic');
const { Mission } = require('../../data/models');
const { cleanUp, populate, generate } = require('../helpers');
const {
  errors: { ExistenceError },
} = require('com');

describe('createMission', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  let user, participant, traveler;

  const anyId = new ObjectId();

  let initialDate = new Date();

  let moonTravelEnd = new Date(initialDate);
  moonTravelEnd.setDate(initialDate.getDate() + 1);

  // let marthTravelEnd = new Date(initialDate);
  // marthTravelEnd.setDate(initialDate.getDate() + 2);

  // let unexploredPlanetEnd = new Date(initialDate);
  // unexploredPlanetEnd.setDate(initialDate.getDate() + 7);

  beforeEach(() => {
    user = generate.user();
    participant = generate.participant();
    traveler = generate.explorer('monkey');

    return cleanUp().then(() => populate([user]));
  });

  it('succeeds on new mission', async () => {
    await createMission(
      user._id.toString(),
      traveler,
      'moon',
      initialDate.toISOString(),
      moonTravelEnd.toISOString(),
      [participant],
      'beer'
    );

    const createdMission = await Mission.findOne();

    expect(createdMission.creator).to.deep.equal(user._id);
    expect(createdMission.traveler[0].race).to.be.equal('monkey');
    expect(createdMission.destination).to.be.equal('moon');
    expect(createdMission.startDate).to.deep.equal(initialDate);
    expect(createdMission.endDate).to.deep.equal(moonTravelEnd);
    expect(createdMission.participants[0].name).to.be.equal(participant.name);
    expect(createdMission.loserPrice).to.be.equal('beer');
  });

  it('should fail if creator doesnt exists', () => {
    return createMission(
      anyId.toString(),
      traveler,
      'moon',
      initialDate.toISOString(),
      moonTravelEnd.toISOString(),
      [participant],
      'beer'
    ).catch((error) => {
      expect(error).to.be.instanceOf(ExistenceError);
      expect(error.message).to.equal(`user with id ${anyId} doesnt exists`);
    });
  });

  after(() => cleanUp().then(() => mongoose.disconnect()));
});
