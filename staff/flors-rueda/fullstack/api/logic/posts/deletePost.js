const { readFile, writeFile } = require('fs');
const { validators: { validateCallback, validateId } } = require('com');

module.exports = function deletePost(userAuth, postId, callback) {
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
            callback(new Error('authentication failed'));
            return;
        }

        readFile('./data/posts.json', 'utf8', (error, postsJson) => {
            if (error) {
                callback(error);
                return;
            }

            const posts = JSON.parse(postsJson);
            const postIndex = posts.findIndex(post => post.id === postId);

            if (postIndex === -1 || posts[postIndex].author !== userAuth) {
                callback(new Error('post authentication failed'));
                return;
            }

            posts.splice(postIndex, 1);

            const _postsJson = JSON.stringify(posts, null, 4);

            writeFile('./data/posts.json', _postsJson, 'utf8', error => {
                if (error) {
                    callback(error);
                    return;
                }

                callback(null);
            });
        });
    });
};
