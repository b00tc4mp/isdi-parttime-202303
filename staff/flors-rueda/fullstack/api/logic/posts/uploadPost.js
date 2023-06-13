const { readFile, writeFile } = require('fs');
const { validators: { validateCallback, validateId, validatePostText }, helpers: { generateUUID } } = require('com');

module.exports = function uploadPost(postImg, postText, authorId, callback) {
    validateId(authorId);
    validatePostText(postText);
    validateCallback(callback);

    //TODO add missing tests and dotenv!

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

            const user = users.find(user => user.id === authorId);

            if (!user) {
                callback(new Error(`user with id ${authorId} not found`));
                return;
            }

            const post = {
                id: generateUUID(),
                author: authorId,
                text: postText,
                image: postImg,
                date: new Date(Date.now()),
                likes: [],
                edited: [],
                isPublic: true
            };

            posts.push(post);

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
