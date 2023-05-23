import { posts } from './data/posts/data.js';
import { savePosts } from './data/posts/data-managers.js';
import { validatePostExists, validatePostAuthor, validatePostImage, validatePostText } from './data/posts/validators.js';
import { validateUserID } from './data/users/validators.js';

export const updatePost = (newText, newPostImg, id, userId) => {
  validatePostExists(id);
  validateUserID(userId);
  const originalPost = posts.filter((post) => { if (post.id === id) return post })[0];
  validatePostAuthor(originalPost, userId);
  if(newPostImg) validatePostImage(newPostImg);
  validatePostText(newText);
  const editedPost = originalPost;
  if(newText) editedPost.text = newText;
  if(newPostImg) editedPost.image = newPostImg;
  (editedPost.edited).push(new Date)
  posts.filter((post) => {
    if (post.id === id) post = editedPost;
  });
  savePosts();
};