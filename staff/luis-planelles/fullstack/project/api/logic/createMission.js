const {
  validators: {
    validateId,
    validateText,
    validateObject,
    validateDateString,
    validateArray,
  },
  errors: { ExistenceError },
} = require('com');
const { User, Mission } = require('../data/models');

/**
 * Creates a new post by a user.
 * @param {string} userId - The ID of the user creating the mission.
 * @param {object} traveler - The traveler associated with the mission.
 * @param {string} destination - The destination of the mission.
 * @param {DateString} starDate - The star date of the mission.
 * @param {DateString} endDate - The end date of the mission.
 * @param {array} participant - The array with participants in mission.
 * @param {string} loserPrice - The loser price of the mission.
 * @returns {Promise<object>} - A promise that resolves to the created post object.
 * @throws {ExistenceError} - If the user with the provided ID does not exist.
 * @throws {TypeError} - on userId, traveler, destination, StartDate, EndDate, participan or loserPrice wrong type.
 * @throws {ContentError} - on userId, traveler, destination, StartDate, EndDate, participan or loserPrice wrong characters.
 */

const createMission = (
  userId,
  traveler,
  destination,
  startDate,
  endDate,
  participants,
  loserPrice
) => {
  validateId(userId, 'user id');
  validateObject(traveler, 'traveler');
  validateDateString(startDate, 'start date');
  validateDateString(endDate, 'end date');
  validateArray(participants, 'participants');
  validateText(loserPrice, 'loser price');

  return (async () => {
    const foundUser = await User.findById(userId);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} doesnt exists`);

    await Mission.create({
      creator: userId,
      traveler,
      destination,
      status: 'in_progress',
      lastUpdate: new Date(),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      participants,
      loserPrice,
    });
  })();
};

module.exports = createMission;
