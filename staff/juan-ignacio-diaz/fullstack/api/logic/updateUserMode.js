const { 
    validators: { validateId },
    errors: { ExistenceError }  
} = require('com')

const { User } = require('../data/models')

module.exports = (userId, mode) => {
    validateId(userId, 'user id')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return User.findByIdAndUpdate(userId, { $set: { mode: mode }})
        })
        .then(() => { })  
}