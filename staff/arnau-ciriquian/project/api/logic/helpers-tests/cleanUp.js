const { User, Character, Mission } = require('../../data/models')

module.exports = async () => {
  try {
    await Promise.all([
      User.deleteMany(),
      Character.deleteMany(),
      Mission.deleteMany()
    ])
  } catch (error) {
    console.error('Cleanup error:', error)
  }
}