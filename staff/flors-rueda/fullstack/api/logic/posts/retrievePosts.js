const { readFile } = require('fs');
const { validators: { validateCallback, validateId } } = require('com');

module.exports = function retrievePosts(userAuth, callback) {
    validateId(userAuth);
    validateCallback(callback);

    readFile('./data/posts.json', 'utf8', (error, postsJson) => {
        if (error) {
            callback(error);
            return;
        }

        const posts = JSON.parse(postsJson);

        readFile('./data/users.json', 'utf8', (error, usersJson) => {
            if (error) {
                callback(error);
                return;
            }

            const users = JSON.parse(usersJson);

            const user = users.find(user => user.id === userAuth);

            if (!user) {
                callback(new Error(`user with id ${userAuth} not found`));
                return;
            }

            posts.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)));

            let filteredPosts = [];
            posts.forEach(post => {
                if (post.isPublic || userAuth === post.author) {
                    post.isFav = user.favs.includes(post.id);

                    const author = users.find(_user => _user.id === post.author);

                    post.author = {
                        id: author.id,
                        name: author.name,
                        username: author.username,
                        avatar: author.avatar
                    };

                    filteredPosts.push(post);
                }
            });

            callback(null, filteredPosts);
        });
    });
};
