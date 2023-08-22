const { ObjectId } = require('mongodb');

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

  nasaEvent: (date, type) => ({
    date,
    type,
    lastUpdate: Date.now(),
  }),
};

module.exports = generate;
