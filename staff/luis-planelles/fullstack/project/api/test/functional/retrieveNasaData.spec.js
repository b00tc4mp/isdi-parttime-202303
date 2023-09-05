require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { retrieveNasaData } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');

const {
  errors: { ExistenceError, ContentError },
} = require('com');

describe('retrieveNasaData', () => {
  const isMinorDate = (endDate, dateToCheck) => {
    return dateToCheck <= endDate;
  };

  const nasaApiKey = process.env.NASA_KEY,
    NASADonki = 'https://api.nasa.gov/DONKI',
    nasaEndpoints = {
      massEjection: `${NASADonki}/CME?startDate=2017-01-03&endDate=2017-01-03&api_key=${nasaApiKey}`,
      geoStorm: `${NASADonki}/GST?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
      planetShock: `${NASADonki}/IPS?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
      solarFlare: `${NASADonki}/FLR?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
      solarParticle: `${NASADonki}/SEP?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
      magnetoPause: `${NASADonki}/MPC?startDate=2016-01-01&endDate=2016-03-31&api_key=${nasaApiKey}`,
      radiationBelt: `${NASADonki}/RBE?startDate=2016-01-01&endDate=2016-01-31&api_key=${nasaApiKey}`,
      speedSteam: `${NASADonki}/HSS?startDate=2016-01-01&endDate=2016-01-31&api_key=${nasaApiKey}`,
    };

  before(() => mongoose.connect(process.env.MONGODB_URL));

  let user, userId, currentDate;

  beforeEach(() => {
    user = generate.user();
    userId = user._id.toString();

    currentDate = new Date();
    const tenMinutesAgo = new Date(currentDate.getTime() - 10 * 60 * 1000);

    const apiCall = generate.apiCall(tenMinutesAgo);

    return cleanUp().then(() => populate([user], [], [], [apiCall]));
  });

  it('success on retrieve nasa data', async function () {
    this.timeout(9000);

    const retrievedNasaData = await retrieveNasaData(userId);

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

    retrievedNasaData.map((eventData) => {
      const isMinor = isMinorDate(currentDate, eventData.date);

      expect(isMinor).to.be.true;
      expect(eventData.event).to.oneOf(expectedEvents);
      expect(eventData.link).to.contain(
        '/webtools.ccmc.gsfc.nasa.gov/DONKI/view/'
      );
    });
  });

  it('success no save data if apicall date doent exist', async function () {
    this.timeout(9000);

    await cleanUp();

    await populate([user], [], [], []);

    const retrievedNasaData = await retrieveNasaData(userId);

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

    retrievedNasaData.map((eventData) => {
      const isMinor = isMinorDate(currentDate, eventData.date);

      expect(isMinor).to.be.true;
      expect(eventData.event).to.oneOf(expectedEvents);
      expect(eventData.link).to.contain(
        '/webtools.ccmc.gsfc.nasa.gov/DONKI/view/'
      );
    });
  });

  it('should no save data if apicall date is less than ten minutes ago', async function () {
    this.timeout(9000);

    await cleanUp();

    const apiCall = generate.apiCall(currentDate);
    await populate([user], [], [], [apiCall]);

    const retrievedNasaData = await retrieveNasaData(userId, nasaEndpoints);

    expect(retrievedNasaData.length).to.be.equal(0);
  });

  it('throws ExistenceError when user does not exist', async () => {
    const nonExistentUserId = new ObjectId().toString();

    try {
      await retrieveNasaData(nonExistentUserId);
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
      await retrieveNasaData(emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is empty');
    }
  });

  it('should raise TypeError if user id is not a string', async () => {
    const noStringId = 11;

    try {
      await retrieveNasaData(noStringId);
      currentDate = new Date();
      tenMinutesAgo = new Date(currentDate.getTime() - 10 * 60 * 1000);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('user id is not a string');
    }
  });

  it('should raise ContentError if user id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await retrieveNasaData(shortId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id does not have 24 characters');
    }
  });

  it('should raise ContentError if user id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await retrieveNasaData(nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is not hexagecimal');
    }
  });

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
