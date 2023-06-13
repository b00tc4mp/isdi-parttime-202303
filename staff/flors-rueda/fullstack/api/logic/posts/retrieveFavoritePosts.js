const { readFile } = require('fs');
const { validators: { validateCallback, validateId } } = require('com');

module.exports = function retrieveFavoritePosts(userAuth, callback) {
    validateId(userAuth);
    validateCallback(callback);

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

        readFile('./data/posts.json', 'utf8', (error, postsJson) => {
            if (error) {
                callback(error);
                return;
            }

            const posts = JSON.parse(postsJson);
            const _posts = [];

            posts.sort((recent, past) => Number(new Date(past.date)) - Number(new Date(recent.date)));

            posts.forEach(post => {
                if (user.favs.includes(post.id)) {
                    if (post.isPublic || userAuth === post.author) {
                        post.isFav = user.favs.includes(post.id);

                        const _user = users.find(user => user.id === post.author);

                        post.author = {
                            id: _user.id,
                            name: _user.name,
                            username: _user.username,
                            avatar: _user.avatar
                        };

                        _posts.push(post);
                    }
                }
            });

            callback(null, _posts);
        });
    });
};
