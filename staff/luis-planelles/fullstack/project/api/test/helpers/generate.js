const { ObjectId } = require('mongodb');

const startDate = new Date();
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 1);

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
    email: `e-${Math.random()}@mail.com`,
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
    startDate = new Date(),
    endDate = new Date()
  ) => ({
    _id: new ObjectId(),
    creator: user._id,
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
    link: 'event-link',
  }),

  apiCall: (lastUpdate) => ({
    lastUpdate,
  }),
};

module.exports = generate;
