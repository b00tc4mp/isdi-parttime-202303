require('dotenv').config();

const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { createMission } = require('../../logic');
const { Mission } = require('../../data/models');
const { cleanUp, populate, generate } = require('../helpers');
const {
  errors: { ExistenceError, ContentError },
} = require('com');

describe('createMission', () => {
  let date;

  before(() => {
    date = new Date();
    fakeDate = sinon.useFakeTimers(date.getTime());

    return mongoose.connect(process.env.MONGODB_URL);
  });

  let user, participant;

  const anyId = new ObjectId();

  beforeEach(() => {
    user = generate.user();
    participant = generate.participant();

    return cleanUp().then(() => populate([user]));
  });

  it('success on new mission', async () => {
    await createMission(
      user._id.toString(),
      'monkey',
      'moon',
      [participant],
      'beer'
    );

    const createdMission = await Mission.findOne();

    expect(createdMission.creator).to.deep.equal(user._id);
    expect(createdMission.traveler[0].race).to.be.equal('monkey');
    expect(createdMission.destination).to.be.equal('moon');
    expect(createdMission.status).to.be.equal('in_progress');
    expect(createdMission.lastUpdate).to.deep.equal(date);
    expect(createdMission.startDate).to.deep.equal(date);
    expect(createdMission.participants[0].name).to.be.equal(participant.name);
    expect(createdMission.loserPrice).to.be.equal('beer');
  });

  it('success on all correct destination', async () => {
    const destinations = ['moon', 'mars', 'unexplored_planet'];

    for (const destination of destinations) {
      await createMission(
        user._id.toString(),
        'monkey',
        destination,
        [generate.participant()],
        'beer'
      );
    }

    const createdMissions = await Mission.find();

    for (let i = 0; i < createdMissions.length; i++) {
      expect(createdMissions[i].destination).to.equal(destinations[i]);
    }
  });

  it('success on moon destinantion with correct end date', async () => {
    let moonTravelEnd = new Date(date);
    moonTravelEnd.setDate(date.getDate() + 1);

    await createMission(
      user._id.toString(),
      'monkey',
      'moon',
      [participant],
      'beer'
    );

    const createdMission = await Mission.findOne();

    expect(createdMission.endDate).to.deep.equal(moonTravelEnd);
  });

  it('success on mars destinantion with correct end date', async () => {
    let marsTravelEnd = new Date(date);
    marsTravelEnd.setDate(date.getDate() + 2);

    await createMission(
      user._id.toString(),
      'monkey',
      'mars',
      [participant],
      'beer'
    );

    const createdMission = await Mission.findOne();

    expect(createdMission.endDate).to.deep.equal(marsTravelEnd);
  });

  it('success on unexplored planet destinantion with correct end date', async () => {
    let unexploredPlanetEnd = new Date(date);
    unexploredPlanetEnd.setDate(date.getDate() + 5);

    await createMission(
      user._id.toString(),
      'monkey',
      'unexplored_planet',
      [participant],
      'beer'
    );

    const createdMission = await Mission.findOne();

    expect(createdMission.endDate).to.deep.equal(unexploredPlanetEnd);
  });

  it('success on all correct travelers', async () => {
    const travelers = ['monkey', 'robot', 'dog', 'billonaire'];

    for (const traveler of travelers) {
      await createMission(
        user._id.toString(),
        traveler,
        'mars',
        [generate.participant()],
        'beer'
      );
    }

    const createdMissions = await Mission.find();

    for (let i = 0; i < createdMissions.length; i++) {
      expect(createdMissions[i].traveler[0].race).to.equal(travelers[i]);
    }
  });

  it('success on many participants', async () => {
    const participants = ([
      participant1,
      participant2,
      participant3,
      participant4,
    ] = [
      generate.participant(),
      generate.participant(),
      generate.participant(),
      generate.participant(),
    ]);

    await createMission(
      user._id.toString(),
      'monkey',
      'mars',
      participants,
      'beer'
    );

    const createdMissions = await Mission.find();

    createdMissions[0].participants.forEach((participant, index) => {
      expect(participant.name).to.equal(participants[index].name);
    });
  });

  it('should raise existence error if creator doesnt exist', () => {
    return createMission(
      anyId.toString(),
      'monkey',
      'moon',
      [participant],
      'beer'
    ).catch((error) => {
      expect(error).to.be.instanceOf(ExistenceError);
      expect(error.message).to.equal(`user with id ${anyId} doesnt exist`);
    });
  });

  it('should raise content error if creator id is empty', async () => {
    const emptyId = '';

    try {
      await createMission(emptyId, 'monkey', 'moon', [participant], 'beer');
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is empty');
    }
  });

  it('should raise type error if creator id is not a string', async () => {
    const noStringId = 11;

    try {
      await createMission(noStringId, 'monkey', 'moon', [participant], 'beer');
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('user id is not a string');
    }
  });

  it('should raise content error if creator id does not have 24 characters', async () => {
    const shortId = 'abc123';

    try {
      await createMission(shortId, 'monkey', 'moon', [participant], 'beer');
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id does not have 24 characters');
    }
  });

  it('should raise content error if creator id is not hexagecimal', async () => {
    const nonHexId = 'invalidValue123456789012';

    try {
      await createMission(nonHexId, 'monkey', 'moon', [participant], 'beer');
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('user id is not hexagecimal');
    }
  });

  it('should raise content error if traveler is empty', async () => {
    const emptyTraveler = '';

    try {
      await createMission(
        user._id.toString(),
        emptyTraveler,
        'moon',
        [participant],
        'beer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('traveler is empty');
    }
  });

  it('should raise type error if traveler is not an string', async () => {
    const noStringTraveler = [];

    try {
      await createMission(
        user._id.toString(),
        noStringTraveler,
        'moon',
        [participant],
        'beer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('traveler is not a string');
    }
  });

  it('should raise existence error if traveler is not valid enum value', async () => {
    const noEnumTraveler = 'not in enum';

    try {
      await createMission(
        user._id.toString(),
        noEnumTraveler,
        'mars',
        [participant],
        'beer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ExistenceError);
      expect(error.message).to.equal(
        `traveler named ${noEnumTraveler} doesnt exist`
      );
    }
  });

  it('should raise content error if destination is empty', async () => {
    const emptyDestination = '';

    try {
      await createMission(
        user._id.toString(),
        'monkey',
        emptyDestination,
        [participant],
        'beer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('destination is empty');
    }
  });

  it('should raise type error if destination is not a string', async () => {
    const noStringDestination = 111;

    try {
      await createMission(
        user._id.toString(),
        'monkey',
        noStringDestination,
        [participant],
        'beer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('destination is not a string');
    }
  });

  it('should raise existence error if destination is not valid enum value', async () => {
    const noEnumDestination = 'not in enum';

    try {
      await createMission(
        user._id.toString(),
        'monkey',
        noEnumDestination,
        [participant],
        'beer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ExistenceError);
      expect(error.message).to.equal(
        `destination named ${noEnumDestination} doesnt exist`
      );
    }
  });

  it('should raise content error if participant is empty', async () => {
    const emptyParticipants = [];

    try {
      await createMission(
        user._id.toString(),
        'monkey',
        'moon',
        emptyParticipants,
        'beer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal(`${emptyParticipants} is empty`);
    }
  });

  it('should raise type error if participant is not an array', async () => {
    const noArrayParticipants = 'noArray';

    try {
      await createMission(
        user._id.toString(),
        'monkey',
        'moon',
        noArrayParticipants,
        'beer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal(`${noArrayParticipants} is not an array`);
    }
  });

  it('should raise type error if participants not contain an object', async () => {
    const invalidEmptyName = 'no object';

    try {
      await createMission(
        user._id.toString(),
        'monkey',
        'moon',
        [invalidEmptyName],
        'beer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('no object at index 0 is not an object');
    }
  });

  it('should raise content error if participant name is empty', async () => {
    const invalidEmptyName = { name: '' };

    try {
      await createMission(
        user._id.toString(),
        'monkey',
        'moon',
        [invalidEmptyName],
        'beer'
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('participant name is empty');
    }
  });

  it('should raise content error if loser price is empty', async () => {
    const emptyLoserPrice = '';

    try {
      await createMission(
        user._id.toString(),
        'monkey',
        'moon',
        [participant],
        emptyLoserPrice
      );
    } catch (error) {
      expect(error).to.be.instanceOf(ContentError);
      expect(error.message).to.equal('loser price is empty');
    }
  });

  it('should raise type error if loser price is not a string', async () => {
    const noStringLoserPrice = 100;

    try {
      await createMission(
        user._id.toString(),
        'monkey',
        'moon',
        [participant],
        noStringLoserPrice
      );
    } catch (error) {
      expect(error).to.be.instanceOf(TypeError);
      expect(error.message).to.equal('loser price is not a string');
    }
  });

  after(() => {
    fakeDate.restore();
    return cleanUp().then(() => mongoose.disconnect());
  });
});
