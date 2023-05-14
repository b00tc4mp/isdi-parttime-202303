import { validatePostImage, validatePostText, validatePostExists, validatePostAuthor } from '../data/validators-posts';
import { validateUserID } from '../data/validators-users';
import posts from '../data/posts';
import { savePost } from '../data/data-managers';

/**
 * Edits the post text and image
 * 
 * @param {string} newText The post text
 * @param {string} newPostImg The base64 string of the post image
 * @param {string} id The id of the post to edit
 * @param {string} userId The user logged id
 * 
 */
export const updatePost = (newText, newPostImg, id, userId) => {
  validatePostExists(id);
  validateUserID(userId);
  validatePostText(postText);validatePostImage(newPostImg);
  const originalPost = posts.filter((post) => { if (post.id === id) return post })[0];
  validatePostAuthor(originalPost, userId);
  if(newPostImg) validatePostImage(postImg);
  validatePostText(newText);
  const editedPost = originalPost;
  if(newText) editedPost.text = newText;
  if(newPostImg) editedPost.image = newPostImg;
  (editedPost.edited).push(new Date)
  posts.filter((post) => {
    if (post.id === id) post = editedPost;
  });
  savePost(editedPost);
};