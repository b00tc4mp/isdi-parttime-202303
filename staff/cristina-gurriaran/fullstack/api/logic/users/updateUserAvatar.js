const { 
    validators: { validateId, validateUrl },
    errors : { ExistenceError }
} = require('com')
const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function updateUserAvatar(userId, avatar){
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId)})
        .then(user => {
            if(!user){
                throw new ExistenceError ('user not found')
            }

            return users.updateOne({ _id: new ObjectId(userId)}, {$set: { avatar: avatar }})
        })
}