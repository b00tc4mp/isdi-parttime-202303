import { savePosts } from './data/posts/data-managers.js';
import { posts } from './data/posts/data.js'
import { validateUserID } from './data/users/validators.js';
import { validatePostExists } from './data/posts/validators.js';
import { retrievePostInfo } from './retrieve-post.js';

export const toggleLike = (postData, userId) => {
  validateUserID(userId);
  validatePostExists(postData.id);
  const index = posts.findIndex(post => post.id === postData.id);
  const userIndex = posts[index].likes.indexOf(userId);
  if (userIndex === -1) {
    posts[index].likes.push(userId);
  } else {
    posts[index].likes.splice(userIndex, 1);
  }
  savePosts();
  return (retrievePostInfo(postData.id)).postData
}