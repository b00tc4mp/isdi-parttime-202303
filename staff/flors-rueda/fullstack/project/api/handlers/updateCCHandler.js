const { updateCC } = require('../logic');
const { handleErrors, extractUserId } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const userId = extractUserId(req);
    const { cc } = req.body;
    return updateCC(userId, cc).then(() => res.status(201).send());
})