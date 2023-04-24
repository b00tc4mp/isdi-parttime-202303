import { savePosts } from './data/posts/data-managers.js';
import { posts } from './data/posts/data.js'
import { validatePostExists } from './data/posts/validators.js';


export const toggleLike = (postId, userId) => {
  validateUserID(userId);
  validatePostExists(postId);
  const index = posts.findIndex(post => post.id === postId);
  const userIndex = posts[index].likes.indexOf(userId);
  if (userIndex === -1) {
    posts[index].likes.push(userId);
  } else {
    posts[index].likes.splice(userIndex, 1);
  }
  savePosts();
  return (posts[index].likes).length
}