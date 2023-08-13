const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Workspot } = require('../../data/models');

module.exports = userId => {
    validateId(userId, 'user id')

    return (async () => {
    const user = await User.findById(userId).lean()

    if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const workspots = await Workspot.find().select('-__v -features.wifi._id -features.plugs._id -features.noise._id -location._id -location.districts._id -location.mapLocation._id').populate('author','name avatar')

        workspots.forEach(workspot => {
            workspot.id = workspot._id.toString()

            delete workspot._id

            workspot.fav = user.favs.some(favs => favs.toString() === workspot.id)

            if (workspot.author._id) {
                workspot.author.id = workspot.author._id.toString()

                delete workspot.author._id
            }

        })
        return workspots

    })()
}

