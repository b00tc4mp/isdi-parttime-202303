const { validators: { validateCallback, validateId } } = require('com');

const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function togglePublicStat(postId, userAuth) {
    validateId(postId);
    validateId(userAuth);

    const { users } = context;
    const { posts } = context;


    return users.findOne({ _id: new ObjectId(userAuth) })
        .then(user => {
            if (!user) throw new Error('user not found')

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error('post not found')

                    if (!post.author.equals(new ObjectId(userAuth))) throw new Error(`post with id ${postId} does not belong to user with id ${userAuth}`)

                    if (post.isPublic)
                        return posts.updateOne({ '_id': new ObjectId(postId) }, { $set: { isPublic: false } })
                    else
                        return posts.updateOne({ '_id': new ObjectId(postId) }, { $set: { isPublic: true } })
                })
        })
}