import { validateCallback, validateId } from './helpers/validators.js';

const retrievePosts = (userId, callback) => {
  validateId(userId, 'user id');
  validateCallback(callback);
};

export default retrievePosts;
