/**
 * Creates a new mission by a user.
 * @param {array} participant - The array with participants in mission.
 * @returns {Array<object>} - Resolves to the duplicate names array.
 */

const findDuplicateNames = (participants) => {
  const names = participants.map((participant) => participant.name);

  const uniqueNames = {};
  const duplicateNames = [];

  for (const name of names) {
    if (uniqueNames[name]) {
      duplicateNames.push(name);
    } else {
      uniqueNames[name] = true;
    }
  }

  return duplicateNames;
};

module.exports = findDuplicateNames;
