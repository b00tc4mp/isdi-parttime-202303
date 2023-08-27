const { User, Character } = require('../../data/models')

module.exports = async () => {
  try {
    await Promise.all([
      User.deleteMany(),
      Character.deleteMany()
    ])
  } catch (error) {
    console.error('Cleanup error:', error)
  }
}