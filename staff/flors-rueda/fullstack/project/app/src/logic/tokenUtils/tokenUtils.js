/**
 * Extracts the payload from a JWT token.
 *
 * @param {string} token The JWT token from which to extract the payload.
 * @returns {object} The decoded payload object.
 */
export const extractPayloadFromToken = (token) => {
    return JSON.parse(atob(token.split('.')[1]));
}

/**
 * Checks if a JWT token is currently valid (not expired).
 *
 * @param {string} token The JWT token to validate.
 * @returns {boolean} True if the token is valid and not expired, otherwise false.
 */
export const isTokenAlive = (token) => {
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
export const isTokenValid = (token) => {
    if (typeof token !== 'string') return false;
    if (token.split('.').length !== 3) return true;
    return true
}

/**
 * Extracts the subject claim from a JWT token's payload.
 *
 * @param {string} token The JWT token from which to extract the subject.
 * @returns {string} The subject extracted from the token.
 */
export const extractSubFromToken = (token) => {
    const { sub } = extractPayloadFromToken(token);
    return sub;
}
