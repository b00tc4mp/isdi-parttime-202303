const { validators: { validateId } } = require('com');

const context = require('../context');
const { ObjectId } = require('mongodb');

module.exports = function updateAvatar(newSrc, userAuth) {
    validateId(userAuth);

    const { users } = context;

    return users.findOneAndUpdate({ _id: new ObjectId(userAuth) }, { $set: { avatar: newSrc } }).then((user) => {
        if (!user) throw new Error('user not found');
    })
}
