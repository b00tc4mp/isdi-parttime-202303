const { retrieveUser } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveUser(userId)
        .then(user => res.json(user));
})