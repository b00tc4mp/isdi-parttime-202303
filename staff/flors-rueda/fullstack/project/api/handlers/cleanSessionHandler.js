const { cleanSession } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return cleanSession(userId).then(() => res.status(201).send());
})