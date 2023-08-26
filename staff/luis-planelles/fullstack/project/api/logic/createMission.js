const {
  validators: {
    validateId,
    validateText,
    validateTraveler,
    validateDestination,
    validateParticipants,
  },
  errors: { ExistenceError, DuplicityError },
} = require('com');

const findDuplicateNames = require('./helpers/findDuplicateNames');
const { User, Mission, Explorer } = require('../data/models');

/**
 * Creates a new mission by a user.
 * @param {string} userId - The ID of the user creating the mission.
 * @param {object} traveler - The traveler associated with the mission.
 * @param {string} destination - The destination of the mission.
 * @param {array} participant - The array with participants in mission.
 * @param {string} loserPrice - The loser price of the mission.
 * @returns {Promise<object>} - A promise that resolves to the created mission object.
 * @throws {ExistenceError} - If the user with the provided ID does not exist.
 * @throws {DuplicityError} - If the name of any participant is repeat.
 * @throws {TypeError} - on userId, traveler, destination, participan or loserPrice wrong type.
 * @throws {ContentError} - on userId, traveler, destination, participan or loserPrice wrong characters.
 */

const createMission = (
  userId,
  traveler,
  destination,
  participants,
  loserPrice
) => {
  validateId(userId, 'user id');
  validateTraveler(traveler);
  validateDestination(destination);
  validateParticipants(participants);
  validateText(loserPrice, 'loser price');

  const duplicateNames = findDuplicateNames(participants);

  if (duplicateNames.length > 0) {
    throw new DuplicityError(
      `duplicate participant names: ${duplicateNames.join(', ')}`
    );
  }

  const startDate = new Date();
  const endDate = new Date(startDate);

  if (destination === 'moon') endDate.setDate(startDate.getDate() + 1);
  if (destination === 'mars') endDate.setDate(startDate.getDate() + 2);
  if (destination === 'unexplored_planet')
    endDate.setDate(startDate.getDate() + 5);

  return (async () => {
    const _traveler = await Explorer.create({ race: traveler });

    const foundUser = await User.findById(userId);

    if (!foundUser)
      throw new ExistenceError(`user with id ${userId} doesnt exist`);

    await Mission.create({
      creator: userId,
      traveler: _traveler,
      destination,
      status: 'in_progress',
      lastUpdate: new Date(),
      startDate,
      endDate: endDate,
      participants,
      loserPrice,
    });
  })();
};

module.exports = createMission;
