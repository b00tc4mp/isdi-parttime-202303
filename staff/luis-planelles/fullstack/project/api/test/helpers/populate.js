const { User, Mission, NasaEvent, ApiCall } = require('../../data/models');

module.exports = (_users, _missions, _nasaEvent, _ApiCall) => {
  const promises = [];

  if (_users && _users.length) promises.push(User.insertMany(_users));

  if (_missions && _missions.length)
    promises.push(Mission.insertMany(_missions));

  if (_nasaEvent && _nasaEvent.length)
    promises.push(NasaEvent.insertMany(_nasaEvent));

  if (_ApiCall && _ApiCall.length) promises.push(ApiCall.insertMany(_ApiCall));

  return Promise.all(promises);
};
