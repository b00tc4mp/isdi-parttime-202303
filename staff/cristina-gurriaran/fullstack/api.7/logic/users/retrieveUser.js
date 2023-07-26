const { 
    validators: { validateId },
    errors : { ExistenceError}
 } = require('com')
const { User } = require('../../data/models')


module.exports = (userId) => {
    validateId (userId, 'user id')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new ExistenceError ('user not found')

            delete user._id
            delete user.password
            delete user.__v

            return user           
        })
}
