const { toggleFollow } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const followerId = extractUserId(req);
    const { followedId } = req.params;
    return toggleFollow(followerId, followedId).then(() => res.status(201).send());
})