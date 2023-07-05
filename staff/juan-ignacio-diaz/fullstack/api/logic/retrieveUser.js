const { 
    validators: { validateId },
    errors: { ExistenceError } 
} = require('com')

const { User } = require('../data/models')


module.exports = (userId) => {
    validateId(userId, 'user id')

    return User.findById(userId) //.lean() retorna el objeto directo de mongoDB
        .then(user => {
            if (!user) throw new ExistenceError('user not found')

            return {
                name: user.name,
                avatar: user.avatar,
                mode: user.mode
            }
        })
}