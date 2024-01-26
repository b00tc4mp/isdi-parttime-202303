const { readFile, writeFile } = require('fs');
const { validators: { validateId } } = require('com');

const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function deletePost(userAuth, postId) {
    validateId(userAuth);
    validateId(postId);

    const { users } = context;
    const { posts } = context;

    return users.findOne({ _id: new ObjectId(userAuth) }).then((user) => {
        if (!user) throw new Error(`user with id ${userAuth} not found`);

        return posts.findOneAndDelete({ _id: new ObjectId(postId) }).then((post) => {
            if (!post || post.author !== userAuth) throw new Error('post authentication failed');
        })

    });
};

