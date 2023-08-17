const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User } = require('../../data/models');

/**
 * Toggles a user follow to another user
 * 
 * @param {string} followerId The user that hit follow id
 * @param {string} followedId The user that will be followed id
 * 
 */

module.exports = async (followerId, followedId) => {
    validateId(followerId, 'follower userId');
    validateId(followedId, 'followed userId');

    const follower = await User.findById(followerId);
    const followed = await User.findById(followedId);

    if (!follower) throw new ExistenceError('followerUser not found');
    if (!followed) throw new ExistenceError('followedUser not found');

    const follows = follower.follows || [];
    const followers = followed.followers || [];

    const indexFollowed = follows.indexOf(followedId);
    const indexFollower = followers.indexOf(followerId)
    if (indexFollowed !== -1) {
        follows.splice(indexFollowed, 1);
        followers.splice(indexFollower, 1);
    } else {
        follows.push(followedId);
        followers.push(followerId);
    }

    await User.updateOne({ _id: followerId }, { follows: follows });
    await User.updateOne({ _id: followedId }, { followers: followers });

};
