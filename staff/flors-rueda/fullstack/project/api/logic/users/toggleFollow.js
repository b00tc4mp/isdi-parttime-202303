const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com');
const { User, Level } = require('../../data/models');


module.exports = async (followerId, followedId) => {
    validateId(followerId, 'userId');
    validateId(followedId, 'userId');

    const follower = await User.findById(followerId);
    const followed = await User.findById(followedId);

    if (!follower) throw new ExistenceError('followerUser not found');
    if (!followed) throw new ExistenceError('followedUser not found');

    const follows = follower.follows || [];
    let followers = followed.followers;

    const index = follows.indexOf(followedId);
    if (index !== -1) {
        follows.splice(index, 1);
        followers -= 1;
    } else {
        follows.push(followedId);
        followers += 1;
    }

    await User.updateOne({ _id: followerId }, { follows: follows });
    await User.updateOne({ _id: followedId }, { followers: followers });

};
