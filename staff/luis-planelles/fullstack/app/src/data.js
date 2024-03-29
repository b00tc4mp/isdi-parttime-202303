const DELAY = 100;

const loadUsers = (callback) =>
  setTimeout(
    () =>
      callback(
        'usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : []
      ),
    DELAY
  );

const saveUsers = (users, callback) =>
  setTimeout(() => {
    localStorage.usersJson = JSON.stringify(users);

    callback();
  }, DELAY);

const saveUser = (user, callback) =>
  loadUsers((users) => {
    const index = users.findIndex((_user) => _user.id === user.id);

    if (index < 0) users.push(user);
    else users.splice(index, 1, user);

    saveUsers(users, callback);
  });

const loadPosts = (callback) =>
  setTimeout(() => {
    const posts =
      'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : [];

    posts.forEach((post) => (post.date = new Date(post.date)));

    callback(posts);
  }, DELAY);

const savePosts = (posts, callback) =>
  setTimeout(() => {
    localStorage.postsJson = JSON.stringify(posts);

    callback();
  }, DELAY);

const savePost = (post, callback) =>
  loadPosts((posts) => {
    const index = posts.findIndex((_post) => _post.id === post.id);

    if (index < 0) posts.push(post);
    else posts.splice(index, 1, post);

    savePosts(posts, callback);
  });

export { loadPosts, loadUsers, savePost, savePosts, saveUser, saveUsers };
