//
const users = () => {
  const users =
    'usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : [];
  return users;
};

const posts = () => {
  const posts =
    'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : [];
  posts.forEach((post) => (post.date = new Date(post.date)));

  return posts;
};

const saveUsers = (users) => {
  localStorage.usersJson = JSON.stringify(users);
};

const saveUser = (user) => {
  const _users = users();

  const index = _users.findIndex((_user) => _user.id === user.id);

  if (index < 0) {
    _users.push(user);
  } else {
    _users.splice(index, 1, user);
  }

  saveUsers(_users);
};

const savePosts = (posts) => {
  localStorage.postsJson = JSON.stringify(posts);
};

const savePost = (post) => {
  const _posts = posts();

  const index = _posts.findIndex((_post) => _post.id === post.id);

  if (index < 0) {
    _posts.push(post);
  } else {
    _posts.splice(index, 1, post);
  }

  savePosts(_posts);
};

export { saveUsers, saveUser, users, savePosts, savePost, posts };
