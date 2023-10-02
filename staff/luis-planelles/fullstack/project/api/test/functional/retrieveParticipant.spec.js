require('dotenv').config();

const { expect } = require('chai');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { retrieveParticipant } = require('../../logic');
const { cleanUp, populate, generate } = require('../helpers');

const {
  errors: { ExistenceError, ContentError },
} = require('com');
const { Mission } = require('../../data/models');

describe('retrieveParticipant', () => {
  before(() => mongoose.connect(process.env.MONGODB_URL));

  const currentDate = new Date();
  let user, missionId, participantId, explorer, participant, mission;

  beforeEach(() => {
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

    missionId = mission._id.toString();
    participantId = mission.participants[0]._id.toString();

    return cleanUp().then(() => populate([], [mission]));
  });

  it('success on retrieve participant', async () => {
    const retrievedParticipant = await retrieveParticipant(
      missionId,
      participantId
    );

    const participant = mission.participants[0];

    expect(retrievedParticipant.name).to.equal(participant.name);
    expect(retrievedParticipant.confirmation).to.equal(
      participant.confirmation
    );
    expect(retrievedParticipant.feedback).to.equal(participant.feedback);
  });

  it('should raise Existence error if mission not exist', async () => {
    const otherMission = generate.mission(
      user,
      explorer,
      participant,
      currentDate,
      currentDate
    );

    const otherMissionId = otherMission._id.toString();

    try {
      await retrieveParticipant(otherMissionId, participantId);
    } catch (error) {
      expect(error).to.be.instanceOf(ExistenceError);
      expect(error.message).to.equal(
        `mission with id ${otherMissionId} not exist`
      );
    }
  });

  it('should raise Existence error if participant not exist', async () => {
    const foundMission = await Mission.findOne();
    foundMission.participants[0]._id = new ObjectId().toString();
    await foundMission.save();

    try {
      await retrieveParticipant(missionId, participantId);
    } catch (error) {
      expect(error).to.be.instanceOf(ExistenceError);
      expect(error.message).to.equal(
        `participant with id ${participantId} not exist`
      );
    }
  });

  it('should raise ContentError if mission id is empty', async () => {
    const emptyId = '';

    try {
      await retrieveParticipant(emptyId, participantId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is empty');
    }
  });

  it('should raise TypeError if mission id is not a string', async () => {
    const noStringId = 11;

    try {
      await retrieveParticipant(noStringId, participantId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('mission id is not a string');
    }
  });

  it('should raise ContentError if mission id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await retrieveParticipant(shortId, participantId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id does not have 24 characters');
    }
  });

  it('should raise ContentError if mission id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await retrieveParticipant(nonHexId, participantId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('mission id is not hexagecimal');
    }
  });

  it('should raise ContentError if participant id is empty', async () => {
    const emptyId = '';

    try {
      await retrieveParticipant(missionId, emptyId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('participant id is empty');
    }
  });

  it('should raise TypeError if participant id is not a string', async () => {
    const noStringId = 11;

    try {
      await retrieveParticipant(missionId, noStringId);
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('participant id is not a string');
    }
  });

  it('should raise ContentError if participant id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await retrieveParticipant(missionId, shortId);
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
      await retrieveParticipant(missionId, nonHexId);
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('participant id is not hexagecimal');
    }
  });

  after(() => {
    return cleanUp().then(() => mongoose.disconnect());
  });
});
