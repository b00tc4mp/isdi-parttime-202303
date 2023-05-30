import { findPostById, findUserById } from './data-managers';

const postBelongingUser = (userId, postId, callback) => {
  findUserById(userId, (foundUser) => {
    if (!foundUser) {
      callback(new Error(`User with id ${userId} not exist`));
      return;
    }

    findPostById(postId, (foundPost) => {
      if (!foundPost) {
        callback(new Error(`Post with id ${postId} not exist`));
        return;
      }

      if (foundUser.id !== foundPost.author) {
        callback(
          new Error(
            `Post with id ${postId} does not belong to user with id ${foundUser.id}`
          )
        );
        return;
      }

      callback(null, foundPost);
    });
  });
};

export default postBelongingUser;
