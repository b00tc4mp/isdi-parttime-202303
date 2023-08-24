const {
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError, PermitError }
} = require('com')
const { User, Workspot } = require('../../data/models')

module.exports = (userId, workspotId, image, name, location, description, category, features) => {
    validateId(userId, 'user id')
    validateUrl(image, 'image url')
    validateText(name, 'name')
    validateText(description, 'description')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const workspot = Workspot.findById(workspotId)

        if (!workspot) throw new ExistenceError(`Workspot with id ${workspotId} not found`)

        return Workspot.updateOne({ _id: workspotId }, { $set: { image, name, location, description, category, features }})
    })()
}
