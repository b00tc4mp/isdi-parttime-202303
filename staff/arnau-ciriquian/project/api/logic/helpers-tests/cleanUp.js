const { User } = require('../../data/models')

module.exports = async () => {
  try {
    await Promise.all([
      User.deleteMany(), // Delete all documents from the User collection
    ]);
  } catch (error) {
    console.error('Cleanup error:', error);
  }
};