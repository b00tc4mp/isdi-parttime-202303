require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {
    updateUserAvatarHandler,
    createCommentHandler,
    createPostFromChatbotHandler,
    deleteCommentHandler,
    deletePostHandler,
    retrievePostHandler,
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,
    retrievePostsHandler,
    retrieveSavedPostsHandler,
    retrieveUserPostsHandler,
    toggleLikePostHandler,
    toggleSavePostHandler,
    toggleVisibilityPostHandler,
    updatePostHandler,
    updateUserPasswordHandler,
    storeInputInDBHandler,
    retrieveConversationHandler,
    retrieveConversationsHandler,
    askForResponseHandler,
    createConversationHandler,
    generateSummaryHandler,
    retrieveOwnSuggestionsHandler,
    retrievePostSuggestionsHandler,
    retrieveSuggestionHandler,
    retrieveOwnPostsSuggestionsHandler,
    createSuggestionHandler,
    deleteSuggestionHandler,
    updateSuggestionHandler,
    deleteConversationHandler,
    deleteAllConversationsHandler,
    toggleCheckSuggestionHandler,
    hideSuggestionHandler,
    retrieveSeenPostsHandler,
    savePostAsSeenHandler,
    retrieveSearchedPostsHandler,
    createPostFromScratchHandler,
    updateUserDescriptionHandler,
    updateUserLocationHandler,
    updateUserOccupationHandler,
    toggleFollowUserHandler,
    retrieveRequestedUserHandler,
    retrieveRequestedUserPostsHandler,
} = require('./handlers')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.post('/users', jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users/user', retrieveUserHandler)

        api.patch('/users/newAvatar', jsonBodyParser, updateUserAvatarHandler)

        api.patch('/users/posts/:postId/comment', jsonBodyParser, createCommentHandler)

        api.post('/users/conversations/:conversationId/newPost', jsonBodyParser, createPostFromChatbotHandler)

        api.patch('/posts/:postId/comments/:commentId/delete', deleteCommentHandler)

        api.delete('/posts/:postId/delete', deletePostHandler)

        api.get('/users/posts/:postId/post', retrievePostHandler)

        api.get('/posts', retrievePostsHandler)

        api.get('/posts/savedPosts', retrieveSavedPostsHandler)

        api.get('/users/userPosts', retrieveUserPostsHandler)

        api.patch('/users/posts/:postId/toggleLike', toggleLikePostHandler)

        api.patch('/users/posts/:postId/toggleSave', toggleSavePostHandler)

        api.patch('/posts/:postId/togglePostVisibility', toggleVisibilityPostHandler)

        api.patch('/users/posts/:postId/updatePost', jsonBodyParser, updatePostHandler)

        api.patch('/users/newPassword', jsonBodyParser, updateUserPasswordHandler)

        api.patch('/users/conversations/:conversationId/userInput', jsonBodyParser, storeInputInDBHandler)

        api.get('/users/conversations/:conversationId/conversation', jsonBodyParser, retrieveConversationHandler)
        
        api.get('/users/conversations', jsonBodyParser, retrieveConversationsHandler)

        api.post('/conversations/:conversationId/askForResponse', jsonBodyParser, askForResponseHandler)

        api.post('/users/createConversation', jsonBodyParser, createConversationHandler)

        api.get('/users/conversations/:conversationId/generateSummary', jsonBodyParser, generateSummaryHandler)
        
        api.get('/posts/:postId/postSuggestions', jsonBodyParser, retrievePostSuggestionsHandler)

        api.get('/ownSuggestions', jsonBodyParser, retrieveOwnSuggestionsHandler)

        api.get('/ownPostsSuggestions', jsonBodyParser, retrieveOwnPostsSuggestionsHandler)

        api.get('/suggestions/:suggestionId', jsonBodyParser, retrieveSuggestionHandler)
        
        api.post('/posts/:postId/suggestions/newSuggestion', jsonBodyParser, createSuggestionHandler)
        
        api.delete('/posts/:postId/suggestions/:suggestionId/delete', jsonBodyParser, deleteSuggestionHandler)
        
        api.patch('/suggestions/:suggestionId/editSuggestion', jsonBodyParser, updateSuggestionHandler)
        
        api.delete('/conversations/:conversationId/deleteConversation', jsonBodyParser, deleteConversationHandler)

        api.delete('/conversations/deleteAllConversations', jsonBodyParser, deleteAllConversationsHandler)

        api.patch('/suggestions/:suggestionId/check', jsonBodyParser, toggleCheckSuggestionHandler)
        
        api.patch('/suggestions/:suggestionId/hidden', jsonBodyParser, hideSuggestionHandler)
        
        api.get('/posts/seenPosts', jsonBodyParser, retrieveSeenPostsHandler)
        
        api.patch('/posts/:postId/saveSeenPost', jsonBodyParser, savePostAsSeenHandler)
        
        api.post('/posts/searchedPosts', jsonBodyParser, retrieveSearchedPostsHandler)
        
        api.post('/newPostFromScratch', jsonBodyParser, createPostFromScratchHandler)

        api.patch('/users/occupation', jsonBodyParser, updateUserOccupationHandler)

        api.patch('/users/location', jsonBodyParser, updateUserLocationHandler)
        
        api.patch('/users/description', jsonBodyParser, updateUserDescriptionHandler)

        api.patch('/users/:profileUserId/toggleFollow', jsonBodyParser, toggleFollowUserHandler)

        api.get('/users/:requestedUserId/requestedUser', jsonBodyParser, retrieveRequestedUserHandler)

        api.get('/users/:requestedUserId/posts/requestedUserPosts', jsonBodyParser, retrieveRequestedUserPostsHandler)

        api.listen(process.env.PORT, () => console.log(`Server running in port ${process.env.PORT}`))
    })
    .catch(console.error)