import posts from './posts/data.mjs';

export const updatePost = (initialPost, newText, newPostImg) => {
  const editedPost = initialPost;
  editedPost.text = newText;
  editedPost.image = newPostImg;
  posts.filter((post) => {
    if (post.id === id) initialPost = editedPost;
  });
};