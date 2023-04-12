import posts from './data/posts/data.mjs';

export const updatePost = (initialPost, newText, newPostImg, id) => {
  const editedPost = initialPost;
  editedPost.text = newText;
  editedPost.image = newPostImg;
  posts.filter((post) => {
    if (post.id === id) initialPost = editedPost;
  });
};