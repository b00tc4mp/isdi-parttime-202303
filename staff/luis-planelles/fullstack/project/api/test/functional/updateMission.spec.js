require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const sinon = require('sinon');

const { updateMission } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');
const { Mission, NasaEvent } = require('../../data/models');

const { ObjectId } = require('mongodb');

const {
  errors: { ExistenceError, ContentError },
} = require('com');

describe('updateMission', () => {
  let date, fakeDate;

  before(() => {
    date = new Date('2023-09-01T00:00:00');
    fakeDate = sinon.useFakeTimers(date.getTime());

    return mongoose.connect(process.env.MONGODB_URL);
  });

  let user, missionId, explorer, participant, mission;

  beforeEach(() => {
    user = generate.user();

    explorer = generate.explorer('monkey');
    participant = generate.participant();

    const lastUpdate = new Date('2023-09-03T00:00:00'),
      startDate = new Date('2023-09-03T00:00:00'),
      endDate = new Date('2023-09-04T00:00:00');

    mission = generate.mission(
      user,
      explorer,
      participant,
      lastUpdate,
      startDate,
      endDate
    );

    missionId = mission._id.toString();

    const solarFlare1 = generate.nasaEvent(
        'solarFlare',
        new Date('2023-09-03T05:18:00')
      ),
      solarFlare2 = generate.nasaEvent(
        'solarFlare',
        new Date('2023-09-03T12:03:00')
      ),
      geoStorm1 = generate.nasaEvent(
        'geoStorm',
        new Date('2023-09-03T12:00:00')
      ),
      planetShock1 = generate.nasaEvent(
        'planetShock',
        new Date('2023-09-03T05:00:00')
      ),
      massEjection1 = generate.nasaEvent(
        'massEjection',
        new Date('2023-09-03T09:12:00')
      ),
      massEjection2 = generate.nasaEvent(
        'massEjection',
        new Date('2023-09-03T12:48:00')
      ),
      speedSteam = generate.nasaEvent(
        'speedSteam',
        new Date('2023-09-03T12:48:00')
      );

    const currentDate = new Date();
    const tenMinutesAgo = new Date(currentDate.getTime() - 10 * 60 * 1000);

    const apiCall = generate.apiCall(tenMinutesAgo);

    return cleanUp().then(() =>
      populate(
        [user],
        [mission],
        [
          solarFlare1,
          solarFlare2,
          geoStorm1,
          planetShock1,
          massEjection1,
          massEjection2,
          speedSteam,
        ],
        [apiCall]
      )
    );
  });

  it('success on update mission', async () => {
    await updateMission(missionId);

    const foundMission = await Mission.findOne();

    expect(foundMission.traveler[0].health).to.be.equal(9.25);
    expect(foundMission.traveler[0].food).to.be.equal(55);
    expect(foundMission.traveler[0].water).to.be.equal(60);
    expect(foundMission.traveler[0].stress).to.be.equal(65);
    expect(foundMission.traveler[0].oxygen).to.be.equal(50);
    expect(foundMission.status).to.be.equal('in_progress');
  });

  it('success on no update mission if isnt nasa data events', async () => {
    await NasaEvent.deleteMany();

    const updatedMission = await updateMission(missionId);

    expect(updatedMission).to.be.undefined;
  });

  it('success on no update mission on failure status', async () => {
    foundMission = await Mission.findOne();
    foundMission.status = 'failure';
    await foundMission.save();

    const updatedMission = await updateMission(missionId);

    expect(updatedMission).to.be.undefined;

    expect(foundMission.status).to.be.equal('failure');
  });

  it('success on no update mission on success status', async () => {
    foundMission = await Mission.findOne();
    foundMission.status = 'success';
    await foundMission.save();

    const updatedMission = await updateMission(missionId);

    expect(updatedMission).to.be.undefined;

    expect(foundMission.status).to.be.equal('success');
  });

  it('success on set success status if mission is over', async () => {
    foundMission = await Mission.findOne();
    foundMission.endDate = new Date('2022-08-03T12:48:00');
    await foundMission.save();

    const updatedMission = await updateMission(missionId);

    expect(updatedMission).to.be.undefined;

    foundMission = await Mission.findOne();

    expect(foundMission.status).to.be.equal('success');
  });

  it('success on set failure status with oxygen at Zero', async () => {
    foundMission = await Mission.findOne();
    foundMission.traveler[0].oxygen = 0;
    await foundMission.save();

    await updateMission(missionId);

    const missionFound = await Mission.findOne();

    expect(missionFound.status).to.be.equal('failure');
  });

  it('success on set failure status with health at Zero', async () => {
    foundMission = await Mission.findOne();
    foundMission.traveler[0].health = 0;
    await foundMission.save();

    await updateMission(missionId);

    const missionFound = await Mission.findOne();

    expect(missionFound.status).to.be.equal('failure');
  });

  it('throws ExistenceError when mission does not exist', async () => {
    const nonExistentMissionId = new ObjectId().toString();

    try {
      await updateMission(nonExistentMissionId);
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
      await updateMission(emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is empty');
    }
  });

  it('should raise TypeError if mission id is not a string', async () => {
    const noStringId = 11;

    try {
      await updateMission(noStringId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('mission id is not a string');
    }
  });

  it('should raise ContentError if mission id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await updateMission(shortId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id does not have 24 characters');
    }
  });

  it('should raise ContentError if mission id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await updateMission(nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is not hexagecimal');
    }
  });

  after(() => {
    fakeDate.restore();
    return cleanUp().then(() => mongoose.disconnect());
  });
});
