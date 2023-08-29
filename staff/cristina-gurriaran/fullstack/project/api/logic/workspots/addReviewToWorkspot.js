const { validators: { validateId, validateText } } = require('com')
const { User, Workspot, Review } = require('../../data/models')


module.exports = (userId, workpostId, text) => {
    validateId(userId, 'user id')
    validateId(workpostId, 'post id')
    validateText(text, 'text')

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const workspot = await Workspot.findById(workpostId)

        if (!workspot) throw new ExistenceError(`Workspot with id ${workspotId} not found`)

        const review = await Review.create({
            workspot: workpostId,
            author: userId, 
            text: text
        })

        return Workspot.updateOne(
            { _id: workpostId },
            { $push: { reviews: review } }
   
        )
    })()
}
