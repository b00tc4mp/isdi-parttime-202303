const { retrieveCC } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { userId } = req.params;
    return retrieveCC(userId).then((cc) => res.json(cc))
})