const { 
    validators: { validateId, validateText },
    errors: { ExistenceError }
} = require('com')
const { User, Workspot } = require('../../data/models')


module.exports = (userId, workspotId, text) => {
    validateId(userId, 'user id')
    validateId(workspotId, 'post id')
    validateText(text, 'text')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const workspot = await Workspot.findById(workspotId)

        if (!workspot) throw new ExistenceError(`Workspot with id ${workspotId} not found`)

        const review = {
            workspot: workspotId,
            author: userId,
            text: text
        }

        return Workspot.updateOne(
            { _id: workspotId },
            { $push: { reviews: review } }
   
        )
    })()
}
