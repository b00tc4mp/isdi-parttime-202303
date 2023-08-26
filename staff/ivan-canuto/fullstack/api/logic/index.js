module.exports = {
  registerUser: require('./registerUser'),
  authenticateUser: require('./authenticateUser'),
  retrieveUser: require('./retrieveUser'),
  updateUserAvatar: require('./updateUserAvatar'),
  updateUserPassword: require('./updateUserPassword'),
  buyPost: require('./buyPost'),
  createComment: require('./createComment'),
  createPost: require('./createPost'),
  deleteComment: require('./deleteComment'),
  deletePost: require('./deletePost'),
  retrievePost: require('./retrievePost'),
  retrievePosts: require('./retrievePosts'),
  retrieveSavedPosts: require('./retrieveSavedPosts'),
  retrieveUserPosts: require('./retrieveUserPosts'),
  toggleLikePost: require('./toggleLikePost'),
  toggleSavePost: require('./toggleSavePost'),
  setPostPrice: require('./setPostPrice'),
  unsetPostPrice: require('./unsetPostPrice'),
  toggleVisibilityPost: require('./toggleVisibilityPost'),
  updatePost: require('./updatePost'),
}