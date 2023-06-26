const { validators: { validateId } } = require('com');

const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function retrievePost(userAuth, postId) {
    validateId(userAuth);
    validateId(postId);

    const { users } = context;
    const { posts } = context;

    return users.findOne({ _id: new ObjectId(userAuth) }).then((user) => {
        if (!user) throw new Error(`user with id ${userAuth} not found`);

        return posts.findOne({ _id: new ObjectId(postId) }).then((post) => {
            if (!post) throw new Error(`post with id ${postId} not found`)

            post.date = new Date(post.date);


        });
    });
};
