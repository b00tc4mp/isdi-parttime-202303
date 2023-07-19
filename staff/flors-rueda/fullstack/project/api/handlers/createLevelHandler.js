const { createLevel } = require('../logic');
const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => {
    const { name, layout, hp } = req.body;
    return createLevel(name, layout, hp).then(() => res.status(201).send());
})