const { validators: { validateId } } = require('com');

const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function toggleFav(postId, userAuth) {
    validateId(userAuth);
    validateId(postId);

    const { users } = context;
    const { posts } = context;

    return users.findOne({ _id: new ObjectId(userAuth) })
        .then(user => {
            if (!user) throw new Error('user not found');

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error('post not found');

                    const favs = user.favs;

                    const index = favs.findIndex((objectId) => objectId.equals(new ObjectId(postId)));

                    if (index < 0)
                        return users.updateOne({ '_id': new ObjectId(userAuth) }, { $push: { 'favs': new ObjectId(postId) } });
                    else
                        return users.updateOne({ '_id': new ObjectId(userAuth) }, { $pull: { 'favs': new ObjectId(postId) } });
                })
        })
};
