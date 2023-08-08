const { toggleFollow } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const followerId = extractUserId(req);
    const { userId } = req.params;
    return toggleFollow(followerId, userId).then(() => res.status(201).send());
})