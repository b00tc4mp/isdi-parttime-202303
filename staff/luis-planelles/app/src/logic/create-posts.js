import { posts, savePosts } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import { validateId, validateText, validateUrl } from './helpers/validators.js';

const createPost = (userId, postImage, postText) => {
  validateUrl(postImage, 'image url');
  validateText(postText, 'text');
  validateId(userId, 'user id');

  const foundUser = findUserById(userId);

  if (!foundUser) throw new Error('User not found');

  let postId = 'post-1';

  const _posts = posts();

  const lastPost = _posts[_posts.length - 1];

  if (lastPost) {
    postId = 'post-' + (parseInt(lastPost.id.slice(5)) + 1);
  }

  const post = {
    id: postId,
    author: userId,
    authorName: foundUser.info.name,
    image: postImage,
    text: postText,
    date: new Date(),
  };

  _posts.push(post);

  savePosts(_posts);
};

export default createPost;
