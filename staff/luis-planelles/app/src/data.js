//
const users =
    'usersJson' in localStorage ? JSON.parse(localStorage.usersJson) : [],
  posts = 'postsJson' in localStorage ? JSON.parse(localStorage.postsJson) : [];

posts.forEach((post) => (post.date = new Date(post.date)));

const saveUsers = () => {
  localStorage.usersJson = JSON.stringify(users);
};

const savePost = () => {
  localStorage.postsJson = JSON.stringify(posts);
};

export { users, posts, savePost, saveUsers };
