import context from './context';
import { tokenUtils } from 'com';
const { isTokenValid, isTokenAlive } = tokenUtils;

/**
 * Checks if a user is currently logged in based on the validity and expiration of the token.
 *
 * @returns {boolean} `true` if the user is logged in (valid and alive token), `false` otherwise.
 */
const isUserLoggedIn = () => {
    console.log('is User Logged In function')
    console.log('function: token valid?:', isTokenValid(context.token))
    console.log('function: token alive?:', isTokenAlive(context.token))
    return isTokenValid(context.token) && isTokenAlive(context.token)
};

export default isUserLoggedIn