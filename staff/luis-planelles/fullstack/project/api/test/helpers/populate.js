const { User, Mission } = require('../../data/models');

module.exports = (_users) => User.insertMany(_users);

module.exports = (_users, _missions) => {
  const promises = [];

  promises.push(User.insertMany(_users));

  if (_missions && _missions.length) {
    promises.push(Mission.insertMany(_missions));
  }

  return Promise.all(promises);
};
