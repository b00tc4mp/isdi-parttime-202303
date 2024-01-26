import context from './context';

/**
 * Logs out the currently authenticated user by clearing their token.
 *
 */
const logoutUser = () => context.token = null;

export default logoutUser