const { 
    validators: { validateId, validateUrl },
    errors : { ExistenceError }
} = require('com')
const { User } = require('../../data/models')


module.exports = (userId, avatar) => {
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url API')

    return User.findById(userId)
        .then(user => {
            if(!user){
                throw new ExistenceError ('user not found')
            }

            return User.updateOne({ _id: userId }, {$set: { avatar: avatar }})
        })
        
        .then(() => { })
}