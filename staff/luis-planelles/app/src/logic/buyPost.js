import { loadPosts, savePosts } from '../data';
import { findUserById } from './helpers/data-managers';
import { validateCallback, validateId } from './helpers/validators';

const buyPost = (buyerId, sellerId, postId, callback) => {
  validateId(buyerId, 'buyerId');
  validateId(sellerId, 'sellerId');
  validateId(postId, 'postId');
  validateCallback(callback);

  findUserById(sellerId, (foundSeller) => {
    if (!foundSeller) {
      callback(new Error(`Seller with id ${sellerId} not exist`));

      return;
    }
  });

  findUserById(buyerId, (foundBuyer) => {
    if (!foundBuyer) {
      callback(new Error(`Buyer with id ${buyerId} not exist`));

      return;
    }
  });

  loadPosts((posts) => {
    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex === -1) {
      callback(new Error(`Post with id ${postId} not exist in database`));

      return;
    }

    const foundPost = posts[postIndex];

    const boughtPost = {
      id: postId,
      author: buyerId,
      image: foundPost.image,
      text: foundPost.text,
      likes: foundPost.likes,
      date: new Date(),
    };

    posts.splice(postIndex, 1, boughtPost);

    savePosts(posts, () => callback(null));
  });
};

export default buyPost;
