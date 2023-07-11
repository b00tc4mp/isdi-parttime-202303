const { validators: { validateId, validateName } } = require('com')

const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function updateName(name, userAuth) {
    validateName(name);
    validateId(userAuth);

    const { users } = context;

    return users.findOneAndUpdate({ _id: new ObjectId(userAuth) }, { $set: { name: name } }).then((user) => {
        if (!user) throw new Error('user not found');
    })
}