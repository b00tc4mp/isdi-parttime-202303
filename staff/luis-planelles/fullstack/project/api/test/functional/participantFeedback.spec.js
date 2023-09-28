require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { participantFeedback } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');

const {
  errors: { ExistenceError, ContentError },
} = require('com');
const { Mission } = require('../../data/models');

describe('participantFeedback', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  let user, explorer, participant, mission, participantId, missionId;

  beforeEach(() => {
    const currentDate = new Date();

    user = generate.user();
    explorer = generate.explorer('monkey');
    participant = generate.participant();

    mission = generate.mission(
      user,
      explorer,
      participant,
      currentDate,
      currentDate
    );

    participantId = participant._id.toString();
    missionId = mission._id.toString();

    return cleanUp().then(() => populate([user], [mission]));
  });

  it('success on participant feedback', async () => {
    await participantFeedback(
      participantId,
      missionId,
      'accept',
      'participant answer'
    );

    const foundMission = await Mission.findOne({});

    expect(foundMission.participants[0]._id).to.deep.equal(participant._id);
    expect(foundMission.participants[0].name).to.equal(participant.name);
    expect(foundMission.participants[0].confirmation).to.equal('accept');
    expect(foundMission.participants[0].feedback).to.equal(
      'participant answer'
    );
  });

  it('success when participant doesnt leave feedback', async () => {
    await participantFeedback(participantId, missionId, 'accept', '');

    const foundMission = await Mission.findOne({});

    expect(foundMission.participants[0]._id).to.deep.equal(participant._id);
    expect(foundMission.participants[0].name).to.equal(participant.name);
    expect(foundMission.participants[0].confirmation).to.equal('accept');
    expect(foundMission.participants[0].feedback).to.equal('');
  });

  it('success when participant doesnt accept', async () => {
    await participantFeedback(participantId, missionId, 'decline', '');

    const foundMission = await Mission.findOne({});

    expect(foundMission.participants[0]._id).to.deep.equal(participant._id);
    expect(foundMission.participants[0].name).to.equal(participant.name);
    expect(foundMission.participants[0].confirmation).to.equal('decline');
    expect(foundMission.participants[0].feedback).to.equal('');
  });

  it('should raise TypeError when confirmation is not a string', async () => {
    try {
      await participantFeedback(participantId, missionId, undefined, '');
    } catch (error) {
      expect(error).to.be.an.instanceOf(TypeError);
      expect(error.message).to.equal('confirmation is not a string');
    }
  });

  it('throws ExistenceError when participant does not exist', async () => {
    const nonExistentParticipantId = new ObjectId().toString();

    try {
      await participantFeedback(
        nonExistentParticipantId,
        missionId,
        'accept',
        'participant answer'
      );
    } catch (error) {
      expect(error).to.be.an.instanceOf(ExistenceError);
      expect(error.message).to.equal(
        `participant with id ${nonExistentParticipantId} not exist`
      );
    }
  });

  it('should raise ContentError if participant id is empty', async () => {
    const emptyId = '';

    try {
      await participantFeedback(
        emptyId,
        missionId,
        'accept',
        'participant answer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('participant id is empty');
    }
  });

  it('should raise TypeError if participant id is not a string', async () => {
    const noStringId = 11;

    try {
      await participantFeedback(
        noStringId,
        missionId,
        'accept',
        'participant answer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('participant id is not a string');
    }
  });

  it('should raise ContentError if participant id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await participantFeedback(
        shortId,
        missionId,
        'accept',
        'participant answer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal(
        'participant id does not have 24 characters'
      );
    }
  });

  it('should raise ContentError if participant id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await participantFeedback(
        nonHexId,
        missionId,
        'accept',
        'participant answer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('participant id is not hexagecimal');
    }
  });

  it('throws ExistenceError when mission does not exist', async () => {
    const nonExistentMissionId = new ObjectId().toString();

    try {
      await participantFeedback(
        participantId,
        nonExistentMissionId,
        'accept',
        'participant answer'
      );
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
      await participantFeedback(
        participantId,
        emptyId,
        'accept',
        'participant answer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is empty');
    }
  });

  it('should raise TypeError if mission id is not a string', async () => {
    const noStringId = 11;

    try {
      await participantFeedback(
        participantId,
        noStringId,
        'accept',
        'participant answer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('mission id is not a string');
    }
  });

  it('should raise ContentError if mission id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await participantFeedback(
        participantId,
        shortId,
        'accept',
        'participant answer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id does not have 24 characters');
    }
  });

  it('should raise ContentError if mission id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await participantFeedback(
        participantId,
        nonHexId,
        'accept',
        'participant answer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is not hexagecimal');
    }
  });

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
