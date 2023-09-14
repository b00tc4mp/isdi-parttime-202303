require('dotenv').config();

const { expect } = require('chai');

const mongoose = require('mongoose');
const sinon = require('sinon');

const { NasaEvent } = require('../../data/models');
const { saveNasaData } = require('../../logic/helpers');
const { cleanUp, populate, generate } = require('../helpers');
const {
  errors: { ConnectionError, ContentError },
} = require('com');

describe('saveNasaData', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  beforeEach(() => {
    const currentDate = new Date();

    const apiCall = generate.apiCall(currentDate);

    return cleanUp().then(() => populate([], [], [], [apiCall]));
  });

  it('success on save nasa event', async () => {
    const correctEventTime = new Date('2050-09-01');

    const expectedEvents = ['massEjection', 'solarFlare', 'speedSteam'];

    const mockedResponses = [
      {
        status: 200,
        text: async () =>
          JSON.stringify([
            { startTime: correctEventTime, link: 'link-to-event1' },
          ]),
      },
      {
        status: 200,
        text: async () =>
          JSON.stringify([
            { beginTime: correctEventTime, link: 'link-to-event2' },
          ]),
      },
      {
        status: 200,
        text: async () =>
          JSON.stringify([
            { eventTime: correctEventTime, link: 'link-to-event3' },
          ]),
      },
    ];

    await Promise.all(
      expectedEvents.map(async (event, index) => {
        const mockedResponse = mockedResponses[index];

        await saveNasaData(mockedResponse, event);
      })
    );

    const nasaEventsSaved = await NasaEvent.find();

    nasaEventsSaved.map((nasaEventSaved) => {
      expect(nasaEventSaved.event).to.oneOf(expectedEvents);
      expect(nasaEventSaved.link).to.contain('link-to-event');
      expect(nasaEventSaved.date).to.deep.equal(correctEventTime);
    });
  });

  it('should raise ContentError when response data is not valid', async () => {
    const invalidJson = {
      status: 200,
      text: async () => 'not-valid',
    };

    try {
      await saveNasaData(invalidJson, 'massEjection');
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal(
        'invalid response body: not-valid from massEjection response status 200'
      );
    }
  });

  it('success on save multiple NASA events', async () => {
    const eventTime1 = new Date('2050-09-01');
    const eventTime2 = new Date('2050-09-02');

    const mockedResponse = {
      status: 200,
      text: async () =>
        JSON.stringify([
          { startTime: eventTime1, link: 'link-to-event-1' },
          { startTime: eventTime2, link: 'link-to-event-2' },
        ]),
    };

    await saveNasaData(mockedResponse, 'massEjection');

    const nasaEventsSaved = await NasaEvent.find();
    expect(nasaEventsSaved).to.have.lengthOf(2);
  });

  it('should raise ConnectionError if response status is not 200', async () => {
    const correctEventTime = new Date('2050-09-01');

    const mockedResponse = {
      status: 406,
      text: async () =>
        JSON.stringify([
          { startTime: correctEventTime, link: 'link-to-event' },
        ]),
    };
    try {
      await saveNasaData(mockedResponse, 'massEjection');
    } catch (error) {
      expect(error).to.be.instanceOf(ConnectionError);
      expect(error.message).to.equal(
        'nasa endpoint to massEjection response status: 406'
      );
    }

    const nasaEventsSaved = await NasaEvent.find();

    expect(nasaEventsSaved).to.deep.equal([]);
  });

  it('should raise ContentError if response data with missing event fields', async () => {
    const missingFieldsResponse = {
      status: 200,
      text: async () => JSON.stringify([{ invalidField: 'invalid-data' }]),
    };

    try {
      await saveNasaData(missingFieldsResponse, 'massEjection');
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal(
        'invalid response body: [{"invalidField":"invalid-data"}] from massEjection response status 200'
      );
    }

    const nasaEventsSaved = await NasaEvent.find();
    expect(nasaEventsSaved).to.have.lengthOf(0);
  });

  it('should not save NasaEvent when EventType not found', async () => {
    const correctEventTime = new Date('2050-09-01');

    const mockedResponse = {
      status: 200,
      text: async () =>
        JSON.stringify([
          { eventTime: correctEventTime, link: 'link-to-event' },
        ]),
    };

    const nasaEventsSaved = await saveNasaData(mockedResponse, 'unknownEvent');

    expect(nasaEventsSaved).to.be.undefined;
  });

  it('should not save NASA event if response data is empty', async () => {
    const emptyResponse = {
      status: 200,
      text: async () => JSON.stringify([]),
    };

    const nasaEventsSaved = await saveNasaData(emptyResponse, 'massEjection');

    expect(nasaEventsSaved).to.be.undefined;
  });

  it('should raise ContentError if event is empty', async () => {
    const correctEventTime = new Date('2050-09-01');
    const emptyEvent = '';

    const mockedResponse = {
      status: 200,
      text: async () =>
        JSON.stringify([
          { eventTime: correctEventTime, link: 'link-to-event' },
        ]),
    };

    try {
      await saveNasaData(mockedResponse, emptyEvent);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('event is empty');
    }
  });

  it('should raise TypeError if event is not a string', async () => {
    const correctEventTime = new Date('2050-09-01');
    const nonStringEvent = 111;

    const mockedResponse = {
      status: 200,
      text: async () =>
        JSON.stringify([
          { eventTime: correctEventTime, link: 'link-to-event' },
        ]),
    };

    try {
      await saveNasaData(mockedResponse, nonStringEvent);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('event is not a string');
    }
  });

  it('should raise TypeError if res is not an object', async () => {
    const nonObjectResponse = [];

    try {
      await saveNasaData(nonObjectResponse, 'massEjection');
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('response is not an object');
    }
  });

  after(() => {
    sinon.restore();
    return cleanUp().then(() => mongoose.disconnect());
  });
});
