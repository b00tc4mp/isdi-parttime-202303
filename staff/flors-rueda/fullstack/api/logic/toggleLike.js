const { readFile, writeFile } = require('fs');
const { validators: { validateCallback, validateId } } = require('com');

module.exports = function toggleLike(postId, userId, callback) {
    validateId(postId);
    validateId(userId);
    validateCallback(callback);

    readFile('./data/posts.json', 'utf8', (error, json) => {
        if (error) {
            callback(error);
            return;
        }

        const posts = JSON.parse(json);

        readFile('./data/users.json', 'utf8', (error, usersJson) => {
            if (error) {
                callback(error);
                return;
            }

            const users = JSON.parse(usersJson);

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

            const index = post.likes.indexOf(userId);
            index < 0 ? post.likes.push(userId) : post.likes.splice(index, 1);

            const postsJson = JSON.stringify(posts, null, 4);

            writeFile('./data/posts.json', postsJson, 'utf8', error => {
                if (error) {
                    callback(error);
                    return;
                }

                callback(null);
            });
        });
    });
};
