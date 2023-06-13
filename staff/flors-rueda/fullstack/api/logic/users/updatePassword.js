const { validators: { validateCallback, validateId, validatePassword, validateRepeatPassword } } = require('com');
const { readFile, writeFile } = require('fs')

module.exports = function updatePassword(userAuth, oldPassword, newPassword, repeatPassword, callback) {
    validateId(userAuth);
    validatePassword(oldPassword);
    validateRepeatPassword(newPassword, repeatPassword);
    validateCallback(callback);
    if (newPassword === oldPassword) throw new Error('new password equals old password');

    readFile('./data/users.json', 'utf-8', (error, json) => {
        if (error) {
            callback(error);
            return;
        }

        const users = JSON.parse(json)

        let user = users.find(user => user.id === userAuth);

        if (!user) {
            callback(new Error('user not found'));
            return;
        }

        if (oldPassword !== user.password) {
            callback(new Error('wrong password'));
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