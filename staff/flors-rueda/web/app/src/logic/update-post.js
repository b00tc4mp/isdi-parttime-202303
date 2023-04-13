import posts from './data/posts/data.js';
import { savePosts } from './data/posts/data-managers.js';

export const updatePost = async (newText, newPostImg, id) => {
  const originalPost = posts.find((post) => post.id === id);
  if (!originalPost) return;
  const editedPost = { ...originalPost };
  if (newText) editedPost.text = newText;
  if (newPostImg) editedPost.image = await getImgUrl(newPostImg);
  posts.splice(posts.indexOf(originalPost), 1, editedPost);
  savePosts();
};