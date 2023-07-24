const { 
    validators: { validateId },
    errors: { ExistenceError } 
} = require('com')

const { User } = require('../data/models')


module.exports = (userId) => {
    validateId(userId, 'user id')

    return (async () => {
        const user = await User.findById(userId, 'name avatar mode').lean()
        if (!user) throw new ExistenceError('user not found')

        delete user._id

        return user
    })()
}