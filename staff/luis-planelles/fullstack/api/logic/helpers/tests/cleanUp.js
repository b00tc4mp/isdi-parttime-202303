context = require('../../context');

module.exports = () => {
  // console.log(context.users);
  const { users, posts } = context;

  return Promise.all([users.deleteMany(), posts.deleteMany()]);
};
