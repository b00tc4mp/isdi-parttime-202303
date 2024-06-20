const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Workspot } = require('../../data/models')


module.exports = (userId, workspotId) => {
    validateId(userId, 'user id')
    validateId(workspotId, 'workspot id')

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError(`User with id ${userId} not found`)

        const workspot = await Workspot.findById(workspotId)

        if (!workspot) throw new ExistenceError(`Workspot with id ${workspotId} not found`)

        const index = user.favs.findIndex((id) => id.toString() === workspotId)

        if (index < 0) {
            return User.updateOne(
                { _id: userId },
                { $push: { favs: workspotId } }
            )

        } else
            user.favs.splice(index, 1)

        return User.updateOne(
            { _id: userId },
            { $set: { favs: user.favs } }
        )
    })()
}

