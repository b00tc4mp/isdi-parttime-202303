import { tokenUtils } from 'com';
import context from './context';

const { extractSubFromToken } = tokenUtils;

const getPlayerId = () => extractSubFromToken(context.token);

export default getPlayerId