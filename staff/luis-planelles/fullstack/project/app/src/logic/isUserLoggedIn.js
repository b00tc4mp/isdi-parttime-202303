import { utils } from 'com';
import context from './context';

const { isTokenValid, isTokenAlive } = utils;

const isUserLoggedIn = () =>
  isTokenValid(context.token) && isTokenAlive(context.token);

export default isUserLoggedIn;
