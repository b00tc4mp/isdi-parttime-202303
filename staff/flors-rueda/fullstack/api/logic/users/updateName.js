const { validators: { validateId, validateName, validateCallback } } = require('com')
const { readFile, writeFile } = require('fs')

module.exports = function updateName(name, userAuth, callback) {
    validateName(name);
    validateId(userAuth);
    validateCallback(callback);

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

        user.name = name;

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