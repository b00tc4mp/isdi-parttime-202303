import context from './context';

const logoutUser = () => context.token = null;

export default logoutUser