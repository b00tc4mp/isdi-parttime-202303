const { validators: { validateCallback, validateId, validatePassword } } = require('com');
const { validateRepeatPassword } = require('com/validators');
const { readFile, writeFile } = require('fs')

module.exports = function updatePassword(userId, oldPassword, newPassword, repeatPassword, callback) {
    validateId(userId);
    validatePassword(oldPassword);
    validateRepeatPassword(newPassword, repeatPassword);
    validateCallback(callback);

    readFile('./data/users.json', 'utf-8', (error, json) => {
        if (error) {
            callback(error);
            return;
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.id === userId);

        if (!user) {
            callback(new Error('user not found'));
            return;
        }

        if (oldPassword !== user.password) {
            callback(new Error('wrong password'));
            return;
        }

        if (newPassword === user.password) {
            callback(new Error('new password equals old password'));
            return;
        }

        user.password = newPassword;

        json = JSON.stringify(users)

        writeFile('./data/users.json', json, 'utf-8', error => {
            if (error) {
                callback(error);
                return;
            }
            callback(null)
        })
    })
}