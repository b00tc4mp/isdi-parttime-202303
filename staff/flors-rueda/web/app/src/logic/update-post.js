import { posts } from './data/posts/data.js';
import { savePosts } from './data/posts/data-managers.js';

export const updatePost = (newText, newPostImg, id) => {
  const originalPost = posts.filter((post) => { if (post.id === id) return post })[0];
  const editedPost = originalPost;
  if(newText) editedPost.text = newText;
  if(newPostImg) editedPost.image = newPostImg;
  posts.filter((post) => {
    if (post.id === id) post = editedPost;
  });
  savePosts();
};

// validate input, validate userAuth, verify post exists, verify post belongs to user