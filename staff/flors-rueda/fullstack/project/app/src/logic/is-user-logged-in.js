import context from './context';
import { isTokenValid, isTokenAlive } from './tokenUtils/tokenUtils';

/**
 * Checks if a user is currently logged in based on the validity and expiration of the token.
 *
 * @returns {boolean} `true` if the user is logged in (valid and alive token), `false` otherwise.
 */
const isUserLoggedIn = () => isTokenValid(context.token) && isTokenAlive(context.token);

export default isUserLoggedIn