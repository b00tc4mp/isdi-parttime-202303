const { validators: { validateId } } = require('com')

const { ObjectId } = require('mongodb')
const context = require('./context')


module.exports = (userId) => {
    validateId(userId)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return {
                name: user.name,
                avatar: user.avatar,
                favs: user.favs,
                mode: user.mode
            }

        })
}