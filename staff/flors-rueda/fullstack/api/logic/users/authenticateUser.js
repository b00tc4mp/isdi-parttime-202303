const { readFile } = require('fs')
const { validators: { validateCallback, validatePassword, validateUsername } } = require('com');

module.exports = function authenticateUser(username, password, callback) {
    validateUsername(username);
    validatePassword(password);
    validateCallback(callback);

    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error);
            return;
        }

        const users = JSON.parse(json);

        const user = users.find(user => user.username === `@${username.toLowerCase()}`);

        if (!user) {
            callback(new Error(`user with username ${username} not found`));
            return;
        }

        if (user.password !== password) {
            callback(new Error('wrong credentials'));
            return;
        }

        callback(null, user.id);
    })
}