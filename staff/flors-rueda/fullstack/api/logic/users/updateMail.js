const { validators: { validateId, validateMail } } = require('com')

const context = require('../context');
const { ObjectId } = require('mongodb');

//TODO if mail already registered throw error

module.exports = function updateMail(mail, userAuth) {
    validateMail(mail);
    validateId(userAuth);

    const { users } = context;

    return users.findOneAndUpdate({ _id: new ObjectId(userAuth) }, { $set: { mail: mail } }).then((user) => {
        if (!user) throw new Error('user not found');
    })

}