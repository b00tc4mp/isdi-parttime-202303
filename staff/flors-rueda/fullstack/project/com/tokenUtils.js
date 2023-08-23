/**
 * Extracts the payload from a JWT token.
 *
 * @param {string} token The JWT token from which to extract the payload.
 * @returns {object} The decoded payload object.
 */
const extractPayloadFromToken = (token) => {
    return JSON.parse(atob(token.split('.')[1]));
}

/**
 * Checks if a JWT token is currently valid (not expired).
 *
 * @param {string} token The JWT token to validate.
 * @returns {boolean} True if the token is valid and not expired, otherwise false.
 */
const isTokenAlive = (token) => {
    const { iat, exp } = extractPayloadFromToken(token);
    const now = Date.now() / 1000;
    return exp - iat > now - iat;
}

/**
 * Checks if a JWT token is valid by performing validation against predefined rules.
 *
 * @param {string} token The JWT token to validate.
 * @returns {boolean} True if the token is valid, otherwise false.
 */
const isTokenValid = (token) => {
    try {
        validateToken(token);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Extracts the subject claim from a JWT token's payload.
 *
 * @param {string} token The JWT token from which to extract the subject.
 * @returns {string} The subject extracted from the token.
 */
const extractSubFromToken = (token) => {
    const { sub } = extractPayloadFromToken(token);
    return sub;
}

module.exports = {
    isTokenAlive,
    isTokenValid,
    extractPayloadFromToken,
    extractSubFromToken
};
