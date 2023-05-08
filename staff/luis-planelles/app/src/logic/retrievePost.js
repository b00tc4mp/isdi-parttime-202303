import { posts } from '../data.js';
import { findPostById } from './helpers/data-managers.js';
import { validateId } from './helpers/validators.js';

const retrievePost = (postId) => {
  validateId(postId, 'post id');

  const foundPost = posts().some((post) => post.id === postId);

  if (!foundPost) throw new Error(`post with id ${postId} not found`);

  const postRetrieved = findPostById(postId);

  return postRetrieved;
};

export default retrievePost;
