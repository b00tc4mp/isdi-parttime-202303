require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { retrieveMissionEvents } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');

const {
  errors: { ExistenceError, ContentError },
} = require('com');
const { Mission } = require('../../data/models');

describe('retrieveMissionEvents', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  let user,
    explorer,
    participant,
    solarFlare,
    geoStorm,
    planetShock,
    massEjection,
    mission;

  beforeEach(() => {
    user = generate.user();

    explorer = generate.explorer('monkey');
    participant = generate.participant();

    solarFlare = generate.nasaEvent('solarFlare', new Date());
    geoStorm = generate.nasaEvent('geoStorm', new Date());
    planetShock = generate.nasaEvent('planetShock', new Date());
    massEjection = generate.nasaEvent('massEjection', new Date());

    mission = generate.mission(
      user,
      explorer,
      participant,
      new Date(),
      new Date(),
      [solarFlare._id, geoStorm._id, planetShock._id, massEjection._id]
    );

    return cleanUp().then(() =>
      populate(
        [],
        [mission],
        [solarFlare, geoStorm, planetShock, massEjection],
        []
      )
    );
  });

  it('success on retrieve mission events', async () => {
    const retrievedNasaEvents = await retrieveMissionEvents(
      mission._id.toString()
    );

    const expectedEvents = [solarFlare, geoStorm, planetShock, massEjection];

    expectedEvents.map((expectedEvent, index) => {
      expect(retrievedNasaEvents[index]._id).to.deep.equal(expectedEvent._id);
      expect(retrievedNasaEvents[index].date).to.deep.equal(expectedEvent.date);
      expect(retrievedNasaEvents[index].event).to.equal(expectedEvent.event);
      expect(retrievedNasaEvents[index].link).to.contain('event-link');
      expect(retrievedNasaEvents[index].__v).to.be.undefined;
    });
  });

  it('should on retrieve mission events if events not in mission processed events ', async () => {
    const foundMission = await Mission.findOne();
    foundMission.processedEvents = [];
    await foundMission.save();

    const retrievedNasaEvents = await retrieveMissionEvents(
      mission._id.toString()
    );

    expect(retrievedNasaEvents).to.deep.equal([]);
  });

  it('should not save event if mission start date is more than event date', async () => {
    const currentDate = new Date();
    const superiorStardate = new Date(currentDate);
    superiorStardate.setDate(currentDate.getDate() + 1);

    const foundMission = await Mission.findOne();
    foundMission.startDate = superiorStardate;
    await foundMission.save();

    const retrievedNasaEvents = await retrieveMissionEvents(
      mission._id.toString()
    );

    expect(retrievedNasaEvents).to.deep.equal([]);
  });

  it('throws ExistenceError when mission does not exist', async () => {
    const nonExistentMissionId = new ObjectId().toString();

    try {
      await retrieveMissionEvents(nonExistentMissionId);
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
      await retrieveMissionEvents(emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is empty');
    }
  });

  it('should raise TypeError if mission id is not a string', async () => {
    const noStringId = 11;

    try {
      await retrieveMissionEvents(noStringId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('mission id is not a string');
    }
  });

  it('should raise ContentError if mission id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await retrieveMissionEvents(shortId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id does not have 24 characters');
    }
  });

  it('should raise ContentError if mission id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await retrieveMissionEvents(nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is not hexagecimal');
    }
  });

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
