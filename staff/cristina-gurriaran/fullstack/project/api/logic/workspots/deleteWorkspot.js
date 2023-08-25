const {
    validators: { validateId },
    errors: { ExistenceError, PermitError },
} = require('com')
const { User, Workspot } = require('../../data/models')


module.exports = (userId, workspotId) => {
    validateId(userId, 'User ID')
    validateId(workspotId, 'Workspot ID')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`User with id ${userId} not found`)

        const workspot = await Workspot.findById(workspotId)

        if (!workspot) throw new ExistenceError(`Workspot with id ${workspot} not found`)

        if (userId !== workspot.author.toString()) throw new PermitError(`Post with id ${workspotId} does not belong to user with id ${userId} `)

        const users = await User.find({ favs: workspotId })

        const usersUpdated = users.map((user) => {
            User.updateOne(
                { _id: user.id },
                { $pullAll: { favs: [workspotId] } }
            )
        })

        await Promise.all([...usersUpdated, Workspot.deleteOne({ _id: workspotId })])
    })()
}