const { readFile, writeFile } = require('fs');
const { validators: { validateCallback, validateId, validatePostText } } = require('com');

module.exports = function updatePost(newText, newPostImg, postId, userAuth, callback) {
    validateId(postId);
    validateId(userAuth);
    validatePostText(newText);
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

            const user = users.find(user => user.id === userAuth);

            if (!user) {
                callback(new Error(`user with id ${userAuth} not found`));
                return;
            }

            const post = posts.find(post => post.id === postId);

            if (!post) {
                callback(new Error(`post with id ${postId} not found`));
                return;
            }

            if (post.author !== userAuth) {
                callback(new Error(`post with id ${postId} does not belong to user with id ${userAuth}`));
                return;
            }

            post.text = newText;
            post.image = newPostImg;
            post.edited.push(new Date());

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
