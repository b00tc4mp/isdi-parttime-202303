const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')
const { UnknownError } = require('com/errors')

const { User } = require('../data/models')

module.exports = function retrieveUser(userId) {
    validateId(userId)

    // return User.findById(userId)
    //     .then(user => {
    //         if (!user) throw new ExistenceError('user not found')

    //         // 2. sanitaze
    //         delete user._id
    //         delete user.password
    //         delete user.favs

    //         return user
    //     })

    return (async () => {
        try {
            const user = await User.findById(userId, "name avatar").lean()

            if (!user) throw new ExistenceError('user not found')

            delete user._id

            return user
        } catch (error) {
            throw new UnknownError(error.message)
        }
    })()
}
