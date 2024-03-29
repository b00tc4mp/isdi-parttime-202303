const jwt = require('jsonwebtoken');

const {
  validators: { validateId },
} = require('com');

const generateToken = (userId) => {
  validateId(userId, 'user id');

  const payload = { sub: userId };

  const { JWT_SECRET, JWT_EXPIRATION } = process.env;

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });

  return token;
};

module.exports = generateToken;
