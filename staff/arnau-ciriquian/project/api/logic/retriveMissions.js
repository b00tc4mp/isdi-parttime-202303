const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Mission } = require('../data/models')

module.exports = userId => {
    validateId(userId, 'user id')

    return Promise.all([
        User.findById(userId).lean(),
        Mission.find().sort('-date').lean()
    ])
        .then(([user, missions]) => {
            if (!user) throw new ExistenceError(`user not found`)

            missions.forEach(mission => {
                mission.id = mission._id.toString()
                delete mission._id
                delete mission.__v
            })

            return missions
        })
}