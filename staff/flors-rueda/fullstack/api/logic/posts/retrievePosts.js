const { validators: { validateId } } = require('com');
const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function retrievePosts(userAuth) {
    validateId(userAuth);

    const { users } = context;
    const { posts } = context;

    return users.findOne({ _id: new ObjectId(userAuth) }).then((user) => {
        if (!user) throw new Error(`user with id ${userAuth} not found`);

        return posts.find({}).sort({ date: -1 }).toArray().then((sortedPosts) => {
            let filteredPosts = [];
            sortedPosts.forEach((post) => {
                if (post.isPublic || userAuth === post.author) {
                    post.isFav = user.favs.includes(post._id.toString());

                    const author = users.find((_user) => _user._id.toString() === post.author);

                    post.author = {
                        id: author._id.toString(),
                        name: author.name,
                        username: author.username,
                        avatar: author.avatar,
                    };

                    filteredPosts.push(post);
                }
            });

            return filteredPosts;
        });
    });
};
