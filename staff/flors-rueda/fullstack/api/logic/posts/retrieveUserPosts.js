const { validators: { validateId } } = require('com');

const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function retrieveUserPosts(userId, userAuth) {
    validateId(userId);
    validateId(userAuth);

    const { users } = context;
    const { posts } = context;

    return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
        if (!user) throw new Error(`user with id ${userId} not found`);

        return users.findOne({ _id: new ObjectId(userId) }).then((_userAuth) => {
            if (!_userAuth) throw new Error(`user with id ${userAuth} not found`);

            return posts.find({ $or: [{ isPublic: true }, { author: userId }] })
                .sort({ date: -1 })
                .toArray()
                .then((filteredPosts) => {
                    filteredPosts.forEach((post) => {
                        post.isFav = user.favs.includes(post._id.toString());
                    });

                    return filteredPosts;
                });
        });
    });
};
