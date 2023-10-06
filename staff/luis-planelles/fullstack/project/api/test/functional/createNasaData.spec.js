require('dotenv').config();

const { expect } = require('chai');

const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { NasaEvent } = require('../../data/models');
const { createNasaData } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');
const {
  errors: { ExistenceError, ContentError },
} = require('com');

describe('createNasaData', () => {
  let user, userId, currentDate;

  const anyId = new ObjectId();

  before(() => mongoose.connect(process.env.MONGODB_URL));

  beforeEach(() => {
    user = generate.user();

    userId = user._id.toString();

    currentDate = new Date();
    const tenMinutesAgo = new Date(currentDate.getTime() - 10 * 60 * 1000);

    const apiCall = generate.apiCall(tenMinutesAgo);

    return cleanUp().then(() => populate([user], [], [], [apiCall]));
  });

  it('success on create nasa data', async function () {
    this.timeout(9000);

    await createNasaData(userId);

    const retrievedNasaEvent = await NasaEvent.find();

    const expectedEvents = [
      'massEjection',
      'geoStorm',
      'planetShock',
      'solarFlare',
      'solarParticle',
      'magnetoPause',
      'radiationBelt',
      'speedSteam',
    ];

    retrievedNasaEvent.map((eventType) => {
      expect(eventType.event).to.oneOf(expectedEvents);
      expect(eventType.date).to.be.an.instanceof(Date);
    });
  });

  it('success no save data if apicall date doent exist', async function () {
    this.timeout(9000);

    await cleanUp();

    await populate([user], [], [], []);

    await createNasaData(userId);

    const retrievedNasaEvents = await NasaEvent.find();

    const expectedEvents = [
      'massEjection',
      'geoStorm',
      'planetShock',
      'solarFlare',
      'solarParticle',
      'magnetoPause',
      'radiationBelt',
      'speedSteam',
    ];

    retrievedNasaEvents.map((eventType) => {
      expect(eventType.event).to.oneOf(expectedEvents);
      expect(eventType.date).to.be.an.instanceof(Date);
    });
  });

  it('should no save data if apicall date is less than ten minutes ago', async function () {
    this.timeout(9000);

    await cleanUp();

    const apiCall = generate.apiCall(currentDate);
    await populate([user], [], [], [apiCall]);

    await createNasaData(userId);

    const retrievedNasaEvents = await NasaEvent.find();

    expect(retrievedNasaEvents.length).to.be.equal(0);
  });

  it('should raise ExistenceError if user doesnt exist', () => {
    return createNasaData(anyId.toString()).catch((error) => {
      expect(error).to.be.instanceOf(ExistenceError);
      expect(error.message).to.equal(`user with id ${anyId} doesnt exist`);
    });
  });

  it('should raise ExistenceError if user doesnt exist', () => {
    return createNasaData(anyId.toString()).catch((error) => {
      expect(error).to.be.instanceOf(ExistenceError);
      expect(error.message).to.equal(`user with id ${anyId} doesnt exist`);
    });
  });

  it('should raise ContentError if user id is empty', async () => {
    const emptyId = '';

    try {
      await createNasaData(emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is empty');
    }
  });

  it('should raise TypeError if user id is not a string', async () => {
    const noStringId = 11;

    try {
      await createNasaData(noStringId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('user id is not a string');
    }
  });

  it('should raise ContentError if user id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await createNasaData(shortId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id does not have 24 characters');
    }
  });

  it('should raise ContentError if user id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await createNasaData(nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is not hexagecimal');
    }
  });

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
