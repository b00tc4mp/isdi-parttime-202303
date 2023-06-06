const { validators: { validateId, validateMail, validateCallback } } = require('com')
const { readFile, writeFile } = require('fs')

module.exports = function updateMail(mail, userId, callback) {
    validateMail(mail);
    validateId(userId);
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

        user.mail = mail;

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