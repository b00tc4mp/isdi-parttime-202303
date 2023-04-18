import { users, posts } from '../data.js';

const retrievePosts = (userId) => {
  const found = users.some((user) => user.id === userId);

  if (!found) throw new Error(`user with id ${userId} not found`);

  return posts.toReversed();
};

export default retrievePosts;
