const { readFile, writeFile } = require('fs')
const { validators: { validateCallback, validateMail, validateRepeatPassword, validateUsername }, helpers: { generateUUID } } = require('com');

module.exports = function registerUser(mail, username, password, repeatPassword, callback) {
    validateMail(mail);
    validateUsername(username);
    validateRepeatPassword(password, repeatPassword);
    validateCallback(callback);

    readFile('./data/users.json', 'utf8', (error, json) => {
        if (error) {
            callback(error);
            return;
        }

        const users = JSON.parse(json);

        let user = users.find(user => user.mail === mail);
        let _user = users.find(user => user.username === `@${username.toLowerCase()}`);

        if (user) {
            callback(new Error(`user with mail ${mail} already exists`));
            return;
        }

        if (_user) {
            callback(new Error(`user with username ${username} already exists`));
            return;
        }

        user = {
            id: generateUUID(),
            username: `@${username.toLowerCase()}`,
            name: username,
            mail: mail,
            avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
            password: password,
            joined: Date.now(),
            favs: [],
        }

        users.push(user);

        json = JSON.stringify(users, null, 4);


        writeFile('./data/users.json', json, 'utf8', error => {
            if (error) {
                callback(error);
                return;
            }

            callback(null);
        })
    })
}

//console.log(generateUUID())