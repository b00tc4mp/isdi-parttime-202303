const context = require('./context');
const {
  validators: { validateId, validateUrl },
} = require('com');
const { ObjectId } = require('mongodb');

const updateUserAvatar = (userId, newAvatar) => {
  validateId(userId, 'userId');
  validateUrl(newAvatar, 'avatar');

  return context.users
    .findOne({ _id: new ObjectId(userId) })
    .then((foundUser) => {
      if (!foundUser) throw new Error(`user with id ${userId} not exists`);

      return context.users.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { avatar: newAvatar } }
      );
    });
};

module.exports = updateUserAvatar;
