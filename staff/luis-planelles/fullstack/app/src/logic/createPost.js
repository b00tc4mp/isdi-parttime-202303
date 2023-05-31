import { loadPosts, savePosts } from '../data.js';
import { findUserById } from './helpers/data-managers.js';
import {
  validateCallback,
  validateId,
  validateText,
  validateUrl,
} from './helpers/validators.js';

const createPost = (userId, postImage, postText, callback) => {
  validateUrl(postImage, 'image url');
  validateText(postText, 'text');
  validateId(userId, 'user id');
  validateCallback(callback);

  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error('User not exist'));

      return;
    }

    let postId = 'post-1';

    loadPosts((posts) => {
      const lastPost = posts[posts.length - 1];

      if (lastPost) {
        postId = 'post-' + (parseInt(lastPost.id.slice(5)) + 1);
      }

      const post = {
        id: postId,
        author: userId,
        image: postImage,
        text: postText,
        date: new Date(),
        likes: [],
        // visibility: 'public',
      };

      posts.push(post);

      savePosts(posts, () => callback(null));
    });
  });
};

export default createPost;
