import { posts } from '../data.js';
import { validateId } from './helpers/validators.js';

const retrievePost = (postId) => {
  validateId(postId, 'post id');

  const foundPost = posts().some((post) => post.id === postId);

  if (!foundPost) throw new Error(`post with id ${postId} not found`);

  return foundPost;
};

export default retrievePost;
