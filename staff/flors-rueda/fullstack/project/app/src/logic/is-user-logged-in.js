import context from './context';
import { tokenUtils } from 'com';
const { isTokenValid, isTokenAlive } = tokenUtils;

/**
 * Checks if a user is currently logged in based on the validity and expiration of the token.
 *
 * @returns {boolean} `true` if the user is logged in (valid and alive token), `false` otherwise.
 */
const isUserLoggedIn = () => {
    console.log('is User Logged In function');
    const token = context.token;
    console.log('TOKEN', token);
    let isTokenValid = true;
    let isTokenAlive = false;
    if (token) {
        if (typeof token !== 'string') isTokenValid = false;
        if (token.split('.').length !== 3) isTokenValid = false;
        const { iat, exp } = JSON.parse(atob(token.split('.')[1]));;
        const now = Date.now() / 1000;
        isTokenAlive = exp - iat > now - iat;
        console.log('token alive', isTokenAlive, 'isTokenValid', isTokenValid);
    }

    return isTokenAlive && isTokenValid
};

export default isUserLoggedIn