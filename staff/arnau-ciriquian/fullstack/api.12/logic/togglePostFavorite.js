const context = require('./context')
const { ObjectId } = require('mongodb')
const { validators: { validateId } } = require('com')

module.exports = (userId, postId) => {
    validateId(userId, 'user id')
    validateId(postId, 'post id')
    
    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error('post not found') 

                    const favs = user.favs

                    const targetObjectId = new ObjectId(postId)
                    const index = favs.findIndex((objectId) => objectId.equals(targetObjectId))

                    if (index < 0)
                        return users.updateOne({'_id': new ObjectId(userId)}, {$push :{'favs': new ObjectId(postId)}})
                    else
                        return users.updateOne({'_id': new ObjectId(userId)}, {$pull :{'favs': new ObjectId(postId)}})        
                })
            })
}
