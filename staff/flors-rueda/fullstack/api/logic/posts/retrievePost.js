const { readFile } = require('fs');
const { validators: { validateCallback, validateId } } = require('com');

module.exports = function retrievePost(userAuth, postId, callback) {
    validateId(userAuth);
    validateId(postId);
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

            const post = posts.find(post => post.id === postId);

            if (!post) {
                callback(new Error(`post with id ${postId} not found`));
                return;
            }

            post.date = new Date(post.date);

            callback(null, post);
        });
    });
};
