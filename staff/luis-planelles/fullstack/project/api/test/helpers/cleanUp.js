const {
  User,
  Mission,
  Explorer,
  Participant,
  NasaEvent,
  ApiCall,
} = require('../../data/models');

const cleanUp = () => {
  return Promise.all([
    User.deleteMany(),
    Mission.deleteMany(),
    Explorer.deleteMany(),
    Participant.deleteMany(),
    NasaEvent.deleteMany(),
    ApiCall.deleteMany(),
  ]);
};

module.exports = cleanUp;
