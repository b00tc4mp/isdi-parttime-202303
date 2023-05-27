import { savePost } from '../data';
import postBelongingUser from './helpers/postBelongingUser';
import {
  validateCallback,
  validateId,
  validateNumber,
} from './helpers/validators';

const setPostPrice = (userId, postId, price, callback) => {
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

    callback(null, postFound);
  });
};

const removePostFromSale = (userId, postId, callback) => {
  validateId(userId, 'user id');
  validateId(postId, 'post id');
  validateCallback(callback);

  postBelongingUser(userId, postId, (error, postFound) => {
    if (error) {
      callback(new Error(error.message));

      return;
    }

    delete postFound.price;

    savePost(postFound, () => callback(null));

    callback(null);
  });
};

export { setPostPrice, removePostFromSale };
