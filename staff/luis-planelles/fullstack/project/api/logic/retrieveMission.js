const {
  validators: { validateId },
} = require('com');
const { Mission, User } = require('../data/models');

const retrieveMission = (userId, missionId) => {
  validateId(userId, 'user id');
  validateId(missionId, 'mission id');

  return (async () => {
    const selectedFields = [
      '-traveler._id',
      '-participants._id',
      '-participants.email',
      '-__v',
    ].join(' ');

    const [foundUser, foundMission] = await Promise.all([
      User.findById(userId),
      Mission.findById(missionId, selectedFields).lean(),
    ]);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exist`);
    if (!foundMission)
      throw new ExistenceError(`mission with id ${missionId} not exist`);

    return foundMission;
  })();
};

module.exports = retrieveMission;
