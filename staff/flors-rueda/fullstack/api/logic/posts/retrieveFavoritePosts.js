const { validators: { validateId } } = require('com');
const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function retrieveFavoritePosts(userAuth) {
    validateId(userAuth);

    const { users } = context;
    const { posts } = context;

    return users.findOne({ _id: new ObjectId(userAuth) }).then((user) => {
        if (!user) throw new Error(`user with id ${userAuth} not found`);

        return posts
            .find({ _id: { $in: user.favs } }) // Retrieve only favorite posts
            .sort({ date: -1 }) // Sort by date in descending order (recent first)
            .toArray()
            .then((favoritePosts) => {
                favoritePosts = favoritePosts.map((post) => {
                    post.isFav = true;
                    const author = users.findOne({ _id: new ObjectId(post.author) });
                    return Promise.all([post, author]);
                });

                return Promise.all(favoritePosts);
            })
            .then((postsWithAuthors) => {
                return postsWithAuthors.map(([post, author]) => ({
                    ...post,
                    author: {
                        id: author._id.toString(),
                        name: author.name,
                        username: author.username,
                        avatar: author.avatar
                    }
                }));
            });
    });
};
