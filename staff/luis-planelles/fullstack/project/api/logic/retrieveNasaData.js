const {
  validators: { validateId },
} = require('com');

const retrieveNasaData = (userId) => {
  validateId(userId, 'user id');
  return (async () => 'success!')();
};

module.exports = retrieveNasaData;
