const { validators: { validateMail, validateRepeatPassword, validateUsername }, helpers: { generateUUID } } = require('com');
const { User } = require('../../data/models');

module.exports = function registerUser(mail, userName, password, repeatPassword, callback) {
    validateMail(mail);
    validateUsername(userName);
    validateRepeatPassword(password, repeatPassword);

    const username = `@${userName.toLowerCase()}`;

    return User.create({
        username,
        mail,
        password,
        avatar: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
        favs: [],
    }).catch(error => {
        if (error.message.includes('E11000'))
            throw new Error(`User with this mail/username already exists`)

        throw error
    })

};