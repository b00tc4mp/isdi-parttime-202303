const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { User, Workspot } = require('../../data/models')

module.exports = (userId, workspotId) => {
    validateId(userId, 'user id')
    validateId(workspotId, 'workspot id')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`User with id ${userId} not found`)

        const workspot = await Workspot.findById(workspotId)

        if (!workspot) throw new ExistenceError(`Workspot with id ${workspotId} not found`)

        const index = workspot.likes.findIndex((id) => id.toString() === userId)

        if (index < 0) {
            return Workspot.updateOne(
                { _id: workspotId },
                { $push: { likes: userId } }
            )

        } else
            workspot.likes.splice(index, 1)

        return Workspot.updateOne(
            { _id: workspotId },
            { $set: { likes: workspot.likes } }
        )
    })()
}