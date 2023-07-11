const { validators: { validateId, validateUrl } } = require('com')
const context = require('../context')
const { ObjectId } = require('../../../api.6/node_modules/mongodb/mongodb')

module.exports = function updateUserAvatar(userId, avatar){
    validateId(userId, 'user id')
    validateUrl(avatar, 'avatar url')

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId)})
        .then(user => {
            if(!user){
                throw new Error ('user not found')
            }

            return users.updateOne({ _id: new ObjectId(userId)}, {$set: { avatar: avatar }})
        })
}