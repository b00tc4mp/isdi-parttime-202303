const { validators: { validateId } } = require('com');

const context = require('../context')
const { ObjectId } = require('mongodb')

module.exports = function retrieveUser(userId) {
    validateId(userId);

    const { users } = context;

    return users.findOne({ _id: new ObjectId(userId) }).then((user) => {
        if (!user) throw new Error('user not found');

        const { username, name, mail, avatar, joined } = user;

        return { username, name, mail, avatar, joined };
    })
}