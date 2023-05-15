import { findPostById, savePost } from '../data/data-managers.js';
import { validatePostExists } from '../data/validators-posts.js';
import { validateUserID } from '../data/validators-users.js';


export const toggleLike = (postId, userId) => {
  validateUserID(userId);
  validatePostExists(postId);
  const post = findPostById(postId)
  const userIndex = post.likes.indexOf(userId);
  if (userIndex === -1) {
    post.likes.push(userId);
  } else {
    post.likes.splice(userIndex, 1);
  }
  savePost(post);
}