const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Mission } = require('../data/models')

module.exports = userId => {
    validateId(userId, 'user id')

    return Promise.all([
        User.findById(userId).lean(),
        //Mission.find().sort('-date').populate('author', 'name avatar').lean()
        Mission.find().sort('-date').lean()
    ])
        .then(([user, missions]) => {
            if (!user) throw new ExistenceError(`user with id ${userId} not found`)

            missions.forEach(mission => {
                mission.id = mission._id.toString()
                delete mission._id
                delete mission.__v

                //potser una marca de mission completada?
                //mission.fav = user.favs.some(fav => fav.toString() === mission.id)
            })

            return missions
        })
}