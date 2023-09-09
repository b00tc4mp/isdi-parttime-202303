import { utils } from 'com';
import Context from '../Context';

const { isTokenValid, isTokenAlive } = utils;

const isUserLoggedIn = () =>
  isTokenValid(Context.token) && isTokenAlive(context.token);

export default isUserLoggedIn;
