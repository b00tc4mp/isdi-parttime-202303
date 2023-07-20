import { tokenUtils } from 'com';
import context from './context';

const { extractSubFromToken } = tokenUtils;

const isCurrentUser = (userId) => userId === extractSubFromToken(context.token);

export default isCurrentUser