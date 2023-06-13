const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateId, validatePassword } } = require('com');

module.exports = function deleteUser(userAuth, password, callback) {
    validateId(userAuth);
    validatePassword(password);
    validateCallback(callback);

    readFile('./data/users.json', 'utf8', (error, usersJson) => {
        if (error) {
            callback(error);
            return;
        }

        const users = JSON.parse(usersJson);

        readFile('./data/posts.json', 'utf8', (error, postsJson) => {
            if (error) {
                callback(error);
                return;
            }
            const posts = JSON.parse(postsJson);

            const user = users.find(user => user.id === userAuth);

            if (!user || user.password !== password) {
                callback(new Error('authentication failed'));
                return;
            }

            for (let i = 0; i < posts.length; i++) {
                const post = posts[i];
                const index = post.likes.findIndex(id => id === userAuth);
                if (index > -1) {
                    post.likes.splice(index, 1);
                }
                if (post.author === userAuth) {
                    posts.splice(i, 1);
                    i--;
                }
            }

            const userIndex = users.findIndex(user => user.id === userAuth);
            users.splice(userIndex, 1);

            const usersSaveJson = JSON.stringify(users, null, 4);
            const postsSaveJson = JSON.stringify(posts, null, 4);

            writeFile('./data/users.json', usersSaveJson, 'utf8', error => {
                if (error) {
                    callback(error);
                    return;
                }

                writeFile('./data/posts.json', postsSaveJson, 'utf8', error => {
                    if (error) {
                        callback(error);
                        return;
                    }

                    callback(null);
                });
            });
        });
    });
};
