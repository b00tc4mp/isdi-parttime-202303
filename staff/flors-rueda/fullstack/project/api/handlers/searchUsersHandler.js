const { searchUsers } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { username } = req.params;
    const userId = extractUserId(req);
    return searchUsers(userId, username).then((users) => res.json(users));
})