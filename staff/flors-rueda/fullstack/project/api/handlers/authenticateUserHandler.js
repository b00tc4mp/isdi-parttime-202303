const { authenticateUser } = require('../logic');
const { handleErrors } = require('./helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


module.exports = handleErrors((req, res) => {
    const { username, password } = req.body;

    const cryptPassword = bcrypt.hashSync(password, 8);

    return authenticateUser(username, cryptPassword)
        .then(userId => {
            const payload = { sub: userId };

            const { JWT_SECRET, JWT_EXPIRATION } = process.env;
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

            res.json(token);
        })
})