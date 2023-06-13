const { readFile, writeFile } = require('fs');
const { validators: { validateCallback, validateId } } = require('com');

module.exports = function toggleFav(postId, userId, callback) {
    validateId(userId);
    validateId(postId);
    validateCallback(callback);

    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error);
            return;
        }

        const users = JSON.parse(json);

        readFile('./data/posts.json', 'utf8', (error, postsJson) => {
            if (error) {
                callback(error);
                return;
            }

            const posts = JSON.parse(postsJson);

            const user = users.find(user => user.id === userId);

            if (!user) {
                callback(new Error(`user with id ${userId} not found`));
                return;
            }

            const post = posts.find(post => post.id === postId);

            if (!post) {
                callback(new Error(`post with id ${postId} not found`));
                return;
            }

            const index = user.favs.indexOf(postId);
            index < 0 ? user.favs.push(postId) : user.favs.splice(index, 1);

            const usersJson = JSON.stringify(users, null, 4);

            writeFile('./data/users.json', usersJson, 'utf8', error => {
                if (error) {
                    callback(error);
                    return;
                }

                callback(null);
            });
        });
    });
};
