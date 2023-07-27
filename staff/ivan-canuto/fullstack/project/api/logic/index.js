module.exports = {
  registerUser: require('./registerUser'),
  authenticateUser: require('./authenticateUser'),
  retrieveUser: require('./retrieveUser'),
  updateUserAvatar: require('./updateUserAvatar'),
  updateUserPassword: require('./updateUserPassword'),
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
  toggleVisibilityPost: require('./toggleVisibilityPost'),
  updatePost: require('./updatePost'),
}