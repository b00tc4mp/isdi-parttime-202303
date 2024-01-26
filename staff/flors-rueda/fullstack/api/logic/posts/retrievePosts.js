const { validators: { validateId } } = require('com');
const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function retrievePosts(userAuth) {
    validateId(userAuth);

    const { users } = context;
    const { posts } = context;

    let _user;

    return users.findOne({ _id: new ObjectId(userAuth) })
        .then((user) => {
            if (!user) throw new Error(`user with id ${userAuth} not found`);
            _user = user;
            return posts.find({}).sort({ date: -1 }).toArray();
        })
        .then((sortedPosts) => {
            let filteredPosts = [];

            const promises = sortedPosts.map((post) => {
                if (post.isPublic || userAuth === post.author) {
                    post.isFav = _user.favs.includes(post._id.toString().replace(/"/g, ''));

                    post.id = post._id.toString().replace(/"/g, '');

                    return users.findOne({ _id: new ObjectId(post.author) })
                        .then((author) => {
                            post.author = {
                                id: author._id.toString().replace(/"/g, ''),
                                name: author.name,
                                username: author.username,
                                avatar: author.avatar,
                            };

                            filteredPosts.push(post);
                        });
                }
            });

            return Promise.all(promises).then(() => filteredPosts);
        });
};
