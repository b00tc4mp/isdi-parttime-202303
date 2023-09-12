const {
  validators: { validateId },
  errors: { ExistenceError },
} = require('com');

const { User, Mission } = require('../data/models');

/**
 * @throws {TypeError} - on userId wrong type.
 * @throws {ContentError} - on userId wrong characters.
 */

const retrieveMissions = (userId) => {
  validateId(userId, 'user id');

  return (async () => {
    const foundUser = await User.findById(userId);
    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} not exist`);

    const foundMissions = await Mission.find().lean();

    foundMissions.forEach((mission) => {
      mission.id = mission._id.toString();
      delete mission._id;
      delete mission.__v;
    });

    return foundMissions;
  })();
};

module.exports = retrieveMissions;
