const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Workspot } = require('../../data/models')

module.exports = (userId, workspotId) => {
    validateId(userId, 'user id')
    validateId(workspotId, 'workspot id')

    return(async () => {
        const user = await User.findById(userId).lean()        
        
        if (!user) throw new ExistenceError(`user with id ${userId} not found`)

        const workspot = await Workspot.findById(workspotId, '-__v -features.wifi._id -features.plugs._id -features.noise._id -features.otherFeatures._id -location._id -location.districts._id -location.mapLocation._id').lean()

        if (!workspot) throw new ExistenceError(`post with id ${postId} not found`)

        return workspot
    })()
}