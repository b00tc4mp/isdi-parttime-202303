const { validators: { validateMail, validateRepeatPassword, validateUsername }, helpers: { generateUUID } } = require('com');
const context = require('../context');

module.exports = function registerUser(mail, userName, password, repeatPassword, callback) {
    validateMail(mail);
    validateUsername(userName);
    validateRepeatPassword(password, repeatPassword);

    const username = `@${userName.toLowerCase()}`;
    const { users } = context;

    Promise.all([users.findOne({ mail }), users.findOne({ username })])
        .then(([userByMail, userByUsername]) => {
            if (userByMail || userByUsername) {
                throw new Error('User with this mail/username already exists');
            }

            return users.insertOne({
                id: generateUUID(),
                username: username,
                name: userName,
                mail: mail,
                avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
                password: password,
                joined: Date.now(),
                favs: [],
            });
        })
        .then(() => {
            callback(null);
        })
        .catch((error) => {
            callback(error);
        });
};
