require('dotenv').config();

const { expect } = require('chai');

const mongoose = require('mongoose');

const { getApiData } = require('../../logic/helpers');
const { cleanUp } = require('../helpers');
const { ContentError } = require('com/errors');

describe('getApiData', () => {
  const nasaApiKey = process.env.NASA_KEY,
    NASADonki = 'https://api.nasa.gov/DONKI',
    cmeEndpoint = `${NASADonki}/CME?startDate=2017-01-03&endDate=2017-01-03&api_key=${nasaApiKey}`,
    gtsEndpoint = `${NASADonki}/GST?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
    ipsEndpoint = `${NASADonki}/IPS?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
    flrEndpoint = `${NASADonki}/FLR?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
    sepEndpoint = `${NASADonki}/SEP?startDate=2016-01-01&endDate=2016-01-30&api_key=${nasaApiKey}`,
    mpcEndpoint = `${NASADonki}/MPC?startDate=2016-01-01&endDate=2016-03-31&api_key=${nasaApiKey}`,
    rbeEndpoint = `${NASADonki}/RBE?startDate=2016-01-01&endDate=2016-01-31&api_key=${nasaApiKey}`,
    hssEndpoint = `${NASADonki}/HSS?startDate=2016-01-01&endDate=2016-01-31&api_key=${nasaApiKey}`;

  before(() => mongoose.connect(process.env.MONGODB_URL));

  beforeEach(() => cleanUp());

  it('success on retrieve api nasa eventType massEjection', async () => {
    const res = await getApiData('massEjection', cmeEndpoint);

    expect(res.status).to.be.equal(200);
  });

  it('success on retrieve api nasa eventType geoStorm', async () => {
    const res = await getApiData('geoStorm', gtsEndpoint);

    expect(res.status).to.be.equal(200);
  });

  it('success on retrieve api nasa eventType planetShock', async () => {
    const res = await getApiData('planetShock', ipsEndpoint);

    expect(res.status).to.be.equal(200);
  });

  it('success on retrieve api nasa eventType solarFlare', async () => {
    const res = await getApiData('solarFlare', flrEndpoint);

    expect(res.status).to.be.equal(200);
  });

  it('success on retrieve api nasa eventType solarParticle', async () => {
    const res = await getApiData('solarParticle', sepEndpoint);

    expect(res.status).to.be.equal(200);
  });

  it('success on retrieve api nasa eventType magnetoPause', async () => {
    const res = await getApiData('magnetoPause', mpcEndpoint);

    expect(res.status).to.be.equal(200);
  });

  it('success on retrieve api nasa eventType radiationBelt', async () => {
    const res = await getApiData('radiationBelt', rbeEndpoint);

    expect(res.status).to.be.equal(200);
  });

  it('success on retrieve api nasa eventType speedSteam', async () => {
    const res = await getApiData('speedSteam', hssEndpoint);

    expect(res.status).to.be.equal(200);
  });

  it('should raise Error on fetch fail', () => {
    wrongEndPoint = 'wrong';

    return getApiData('massEjection', wrongEndPoint).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(
        `Error fetching massEjection data from NASA: Failed to parse URL from wrong`
      );
    });
  });

  it('should raise Error on wrongEventType', () => {
    wrongEventType = 'wrong';

    return getApiData(wrongEventType, cmeEndpoint).catch((error) => {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.equal(
        'NASAEvent validation failed: date: Path `date` is required.'
      );
    });
  });

  it('should raise ContentError if event is empty', async () => {
    const emptyEvent = '';

    try {
      await getApiData(emptyEvent, cmeEndpoint);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('eventType is empty');
    }
  });

  it('should raise TypeError if event is not a string', async () => {
    const nonStringEvent = 111;

    try {
      await getApiData(nonStringEvent, cmeEndpoint);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('eventType is not a string');
    }
  });

  it('should raise ContentError if endPoint is empty', async () => {
    const emptyEndpoint = '';

    try {
      await getApiData('massEjection', emptyEndpoint);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('endpoint is empty');
    }
  });

  it('should raise TypeError if endpoint is not a string', async () => {
    const nonStringEndpoint = 111;

    try {
      await getApiData('massEjection', nonStringEndpoint);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('endpoint is not a string');
    }
  });

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
