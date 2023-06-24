const context = require('./context')
const { ObjectId } = require('mongodb')
const { validators: { validateId } } = require('com')

module.exports = (userId) => {
    validateId(userId, 'user id')

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            const favs = user.favs

            favs.map(_postId => {
                return posts.findOne({ _id: new ObjectId(_postId) })
                  .then(post => {
                    if (!post) {
                      return users.updateOne({ '_id': new ObjectId(userId) }, { $pull: { 'favs': new ObjectId(_postId) } })
                    }
                  })
              })            
    })
}