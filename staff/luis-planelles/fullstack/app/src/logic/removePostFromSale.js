import postBelongingUser from './helpers/postBelongingUser';

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
  });
};

export default removePostFromSale;
