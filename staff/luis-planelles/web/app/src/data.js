import DEFAULT_AVATAR_URL from './logic/helpers/global-variables.js';

const users = [
  {
    id: 'user-1',
    email: 'test@test',
    info: { name: 'test', password: 'Tes7@@@@', avatar: DEFAULT_AVATAR_URL },
  },
];

const posts = [];

posts.push({
  id: 'post-1',
  author: 'user-1',
  image:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png',
  text: 'Smile!',
  date: new Date(),
});

export { users, posts };
