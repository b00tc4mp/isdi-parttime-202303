import { utils } from 'com';
import context from './context';

const { isTokenValid, isTokenAlive } = utils;

export default () => isTokenValid(context.token) && isTokenAlive(context.token);
