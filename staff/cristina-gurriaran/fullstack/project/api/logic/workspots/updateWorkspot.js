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
    
    debugger

    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const workspot = await Workspot.findById(workspotId)

        if (!workspot) throw new ExistenceError(`Workspot with id ${workspotId} not found`)

        console.log('userId:', userId);
        console.log('workspot.author:', workspot.author.toString());

        if (userId !== workspot.author.toString()) throw new PermitError(`Workspot with id ${workspotId} does not belong to user with id ${userId}`)
        

        return Workspot.updateOne({ _id: workspotId }, { $set: { image, name, location, description, category, features }})
    })()
}
