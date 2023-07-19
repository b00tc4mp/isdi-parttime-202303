const { handleErrors } = require('./helpers');

module.exports = handleErrors((req, res) => res.send('Hello, API!'));