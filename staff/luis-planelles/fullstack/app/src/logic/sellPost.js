import { savePost } from '../data';
import postBelongingUser from './helpers/postBelongingUser';
import {
  validateCallback,
  validateId,
  validateNumber,
} from './helpers/validators';

const sellPost = (userId, postId, price, callback) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateNumber(price, 'price');
  validateCallback(callback);

  postBelongingUser(userId, postId, (error, postFound) => {
    if (error) {
      callback(new Error(error.message));

      return;
    }

    postFound.price = price;

    savePost(postFound, () => callback(null));
  });
};

export default sellPost;
