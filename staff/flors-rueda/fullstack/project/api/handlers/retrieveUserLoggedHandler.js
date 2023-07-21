const { retrieveUserLogged } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveUserLogged(userId)
        .then(user => res.json(user));
})