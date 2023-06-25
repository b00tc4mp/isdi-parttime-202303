const { validators: { validateText } } = require('com')
const context = require('./context')
const { ObjectId } = require('mongodb')
module.exports = function updateAvatar(userId, url) {

    validateText(userId)

    if (!url) {
         throw new Error('Image not uploaded correctly')
    }

    const { users } = context

    return users.findOne({_id: new ObjectId(userId)})
        .then(user => {

            return users.updateOne({_id: new ObjectId(userId)}, {$set:{avatar: url}})
        })
}