const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Workspot } = require('../../data/models');

module.exports = userId => {
    validateId(userId, 'user id')

    return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const workspots = await Workspot.find()
            .select('-__v -features.wifi._id -features.plugs._id -features.noise._id -features.otherFeatures._id -location._id -location.districts._id -location.mapLocation._id -reviews._id -reviews.__v')
            .populate('author','name avatar')
            .populate('reviews.author', 'name avatar')
            .lean()

        workspots.forEach(workspot => {
            workspot.id = workspot._id.toString()

            delete workspot._id

            workspot.fav = user.favs.some(favs => favs.toString() === workspot.id)

            if (workspot.author._id) {
                workspot.author.id = workspot.author._id.toString()

                delete workspot.author._id
            }

            if (workspot.reviews) {
                workspot.reviews.forEach(review => {
                    if (review.author._id) {
                        review.author.id = review.author._id.toString()

                        delete review.author._id
                    }
                })
            }

        })
        return workspots

    })()
}

