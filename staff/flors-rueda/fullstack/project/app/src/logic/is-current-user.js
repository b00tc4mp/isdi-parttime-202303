import { tokenUtils } from 'com';
import context from './context';
const { extractSubFromToken } = tokenUtils;

/**
 * Checks if the provided user id matches the idof the logged in user.
 *
 * @param {string} userId The user id to be checked.
 * @returns {boolean} `true` if the provided user od matches the logged user's id, `false` otherwise.
 */
const isCurrentUser = (userId) => userId === extractSubFromToken(context.token);

export default isCurrentUser