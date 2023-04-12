import posts from './data/posts/data.mjs';

export const updatePost = (newText, newPostImg, id) => {
  const originalPost = posts.filter((post) => { if (post.id === id) return post })[0];
  const editedPost = originalPost;
  editedPost.text = newText;
  editedPost.image = newPostImg;
  posts.filter((post) => {
    if (post.id === id) post = editedPost;
  });
  console.log(posts)
};