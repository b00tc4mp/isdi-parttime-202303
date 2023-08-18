module.exports = {
    retrievePlaygrounds: require('./retrievePlaygrounds'),
    retrievePlaygroundsFromCity: require('./searchPlaygrounds/retrievePlaygroundsFromCity'),
    retrieveCitiesFromDatabase: require('./searchPlaygrounds/retrieveCitiesFromDatabase'),
    retrieveCityFromSearch: require('./searchPlaygrounds/retrieveCityFromSearch'),
    checkIfHasPlaygroundsNear: require('./checkIfHasPlaygroundsNear'),
    addPlayground: require('./addPlayground'),
    editPost: require('./editPost'),
    deletePost: require('./deletePost'),
    retrieveLikedPlaygrounds: require('./retrieveLikedPlaygrounds'),
    retrieveSavedPosts: require('./retrieveSavedPosts'),
    retrievePlaygroundById: require('./retrievePlaygroundById'),
    toggleLikePlayground: require('./toggleLikePlayground'),
    toggleSavePost: require('./toggleSavePost')
}