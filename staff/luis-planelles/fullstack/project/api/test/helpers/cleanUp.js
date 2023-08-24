const {
  User,
  Mission,
  Explorer,
  Participant,
  NASAEvent,
} = require('../../data/models');

const cleanUp = () => {
  return Promise.all([
    User.deleteMany(),
    Mission.deleteMany(),
    Explorer.deleteMany(),
    Participant.deleteMany(),
    NASAEvent.deleteMany(),
  ]);
};

module.exports = cleanUp;
