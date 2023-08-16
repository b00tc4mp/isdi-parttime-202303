const { updateCC } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { cc, operator } = req.body;
    return updateCC(userId, cc, operator).then(() => res.status(201).send());
})