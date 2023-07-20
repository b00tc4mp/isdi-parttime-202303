import context from './context';
import { tokenUtils } from 'com';

const { isTokenValid, isTokenAlive } = tokenUtils;

const isUserLoggedIn = () => isTokenValid(context.token) && isTokenAlive(context.token);

export default isUserLoggedIn