const { User, Mission, Explorer, NASAEvent } = require('../../data/models');

const cleanUp = () => {
  return Promise.all([
    User.deleteMany(),
    Mission.deleteMany(),
    Explorer.deleteMany(),
    NASAEvent.deleteMany(),
  ]);
};

module.exports = cleanUp;
