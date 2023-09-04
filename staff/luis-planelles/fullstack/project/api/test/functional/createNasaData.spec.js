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
  let user, userId;

  const anyId = new ObjectId();

  const nasaApiKey = process.env.NASA_KEY,
    NASADonki = 'https://api.nasa.gov/DONKI';

  before(() => mongoose.connect(process.env.MONGODB_URL));

  beforeEach(() => {
    user = generate.user();

    userId = user._id.toString();

    return cleanUp().then(() => populate([user], []));
  });

  it('success on create nasa data', async function () {
    this.timeout(9000);

    const successEndpoints = {
      massEjection: `${NASADonki}/CME?startDate=2017-01-03&endDate=2017-01-03&api_key=${nasaApiKey}`,
      geoStorm: `${NASADonki}/GST?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
      planetShock: `${NASADonki}/IPS?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
      solarFlare: `${NASADonki}/FLR?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
      solarParticle: `${NASADonki}/SEP?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
      magnetoPause: `${NASADonki}/MPC?startDate=2016-01-01&endDate=2016-03-31&api_key=${nasaApiKey}`,
      radiationBelt: `${NASADonki}/RBE?startDate=2016-01-01&endDate=2016-01-31&api_key=${nasaApiKey}`,
      speedSteam: `${NASADonki}/HSS?startDate=2016-01-01&endDate=2016-01-31&api_key=${nasaApiKey}`,
    };

    await createNasaData(userId, successEndpoints);

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

  it('success with some enpoints', async function () {
    this.timeout(9000);

    const someEndpoints = {
      massEjection: `${NASADonki}/CME?startDate=2017-01-03&endDate=2017-01-03&api_key=${nasaApiKey}`,
      speedSteam: `${NASADonki}/HSS?startDate=2016-01-01&endDate=2016-01-31&api_key=${nasaApiKey}`,
    };

    await createNasaData(userId, someEndpoints);

    const retrievedNasaEvent = await NasaEvent.find();

    const expectedEvents = ['massEjection', 'speedSteam'];

    retrievedNasaEvent.map((eventType) => {
      expect(eventType.event).to.oneOf(expectedEvents);
      expect(eventType.date).to.be.an.instanceof(Date);
    });
  });

  it('success with not save event with not response data', async function () {
    this.timeout(9000);

    const noBodyResponse = `${NASADonki}/FLR?startDate=2020-01-01&endDate=2020-01-30&api_key=${nasaApiKey}`;

    const endpoint = {
      solarFlare: noBodyResponse,
    };

    await createNasaData(userId, endpoint);

    const retrievedNasaEvent = await NasaEvent.find();

    expect(retrievedNasaEvent.length).to.be.equal(0);
  });

  it('should raise ExistenceError if user doesnt exist', () => {
    return createNasaData(anyId.toString(), {}).catch((error) => {
      expect(error).to.be.instanceOf(ExistenceError);
      expect(error.message).to.equal(`user with id ${anyId} doesnt exist`);
    });
  });

  it('should raise ExistenceError if user doesnt exist', () => {
    return createNasaData(anyId.toString(), {}).catch((error) => {
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

  it('should raise TypeError if endpoints is empty', async () => {
    const emptyEndpoints = '';

    try {
      await createNasaData(userId, emptyEndpoints);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal(`endpoints is not an object`);
    }
  });

  it('should raise TypeError if endpoints is an empty object', async () => {
    const emptyObject = {};

    try {
      await createNasaData(userId, emptyObject);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal(`endpoints is not an object`);
    }
  });

  it('should raise TypeError if endpoints is not an object', async () => {
    const notAnObject = ['wrong'];

    try {
      await createNasaData(userId, notAnObject);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal(`endpoints is not an object`);
    }
  });

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
