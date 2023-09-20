const { ObjectId } = require('mongodb');

const currentDate = new Date();

const endDate = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000);

const generate = {
  user: () => ({
    _id: new ObjectId(),
    name: `name-${Math.random()}`,
    email: `e-${Math.random()}@mail.com`,
    password: `P@ssword-${Math.random()}`,
    avatar: null,
  }),

  participant: () => ({
    name: `name-${Math.random()}`,
  }),

  explorer: (race) => ({
    race,
    health: 100,
    food: 100,
    water: 100,
    stress: 100,
    oxygen: 100,
  }),

  mission: (
    user,
    explorer,
    participant,
    lastUpdate = new Date(),
    startDate = new Date()
  ) => ({
    _id: new ObjectId(),
    creator: user._id,
    creatorName: user.name,
    traveler: explorer,
    destination: 'moon',
    status: 'in_progress',
    lastUpdate,
    startDate,
    endDate,
    participants: [participant],
    loserPrice: 'beer',
  }),

  nasaEvent: (event, date) => ({
    date,
    event,
    link: `event-link-${Math.random()}`,
  }),

  apiCall: (lastUpdate) => ({
    lastUpdate,
  }),
};

module.exports = generate;
