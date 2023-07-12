const { ObjectId } = require('mongodb');

module.exports = {
  user: () => ({
    _id: new ObjectId(),
    name: `name-${Math.random()}`,
    email: `e-${Math.random()}@mail.com`,
    password: `P@ssword-${Math.random()}`,
    avatar: null,
    favourites: [],
  }),

  post: (userId) => ({
    _id: new ObjectId(),
    author: userId,
    image: `image-${Math.random()}`,
    text: `text-${Math.random()}`,
    date: new Date(),
    likes: [],
  }),
};
