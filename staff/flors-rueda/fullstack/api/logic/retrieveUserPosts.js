const { readFile } = require('fs');
const { validators: { validateCallback, validateId } } = require('com');

module.exports = function retrieveUserPosts(userId, userAuth, callback) {
    validateId(userId);
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

            const user = users.find(user => user.id === userId);

            if (!user) {
                const error = new Error(`user with id ${userId} not found`);
                callback(error);
                return;
            }

            const _userAuth = users.find(user => user.id === userAuth);

            if (!_userAuth) {
                const error = new Error(`user with id ${userAuth} not found`);
                callback(error);
                return;
            }

            let filteredPosts = [];
            posts.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)));
            posts.forEach(post => {
                if (post.isPublic || userId === post.author) {
                    post.isFav = user.favs.includes(post.id);
                    if (post.author === user.id) {
                        filteredPosts.push(post);
                    }
                }
            });

            callback(null, filteredPosts);
        });
    });
};
