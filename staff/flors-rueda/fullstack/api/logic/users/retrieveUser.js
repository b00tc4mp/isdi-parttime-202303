const { validators: { validateId, validateCallback } } = require('com');
const { readFile } = require('fs');

module.exports = function retrieveUser(userId, callback) {
    validateId(userId);
    validateCallback(callback);

    readFile('./data/users.json', 'utf-8', (error, json) => {
        if (error) {
            callback(error);
            return;
        }

        const users = JSON.parse(json);

        let user = users.find(user => user.id === userId);

        if (!user) {
            callback(new Error('user not found'));
            return;
        }

        const _user = {
            username: user.username,
            name: user.name,
            mail: user.mail,
            avatar: user.avatar,
            joined: user.joined,
        }

        callback(null, _user)
    })
}