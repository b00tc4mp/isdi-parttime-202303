module.exports = {
  user: () => ({
    name: `name-${Math.random()}`,
    email: `e-${Math.random()}@mail.com`,
    password: `P@ssword-${Math.random()}`,
    avatar: null,
    favourites: [],
  }),

  post: (userId) => ({
    author: userId,
    image: `image-${Math.random()}`,
    text: `text-${Math.random()}`,
    date: new Date(),
    likes: [],
  }),
};
