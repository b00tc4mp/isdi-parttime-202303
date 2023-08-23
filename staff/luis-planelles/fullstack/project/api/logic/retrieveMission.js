const {
  validators: { validateId },
} = require('com');

const retrieveMission = (userId, missionId) => {
  validateId(userId, 'user id');
  validateId(missionId, 'mission id');
  return (async () => 'success!')();
};

module.exports = retrieveMission;
