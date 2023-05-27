import { savePost } from '../data';
import { findPostById, findUserById } from './helpers/data-managers';
import {
  validateCallback,
  validateId,
  validateText,
  validateUrl,
} from './helpers/validators';

const updatePost = (userId, postId, postImage, postText, callback) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateUrl(postImage, 'image url');
  validateText(postText);
  validateCallback(callback);

  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error(`user with id ${userId} not found`));

      return;
    }

    findPostById(postId, (foundPost) => {
      if (!foundPost) {
        callback(new Error(`post with id ${postId} not found`));

        return;
      }

      if (foundPost.author !== userId) {
        callback(
          new Error(
            `post with id ${postId} does not belong to user with id ${userId}`
          )
        );

        return;
      }

      foundPost.image = postImage;
      foundPost.text = postText;
      foundPost.date = new Date();

      savePost(foundPost, () => callback(null));
    });
  });
};

export default updatePost;
