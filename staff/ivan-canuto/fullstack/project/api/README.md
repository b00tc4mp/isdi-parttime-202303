# API

## Description
The api (server-side component of our application) is the backbone that powers our services and handles critical backend operations. It manages data storage, processing, and communication with clients, ensuring the reliability, security, and performance of our application. The server-side is responsible for handling requests, executing business logic, and delivering responses to clients in a timely and efficient manner.

## Endpoints

|        action        | method |        path        |            body            | status |  
|----------------------|--------|--------------------|----------------------------|--------|
| register user        | POST   | /users         | { "name": "...", email: "...", password: "..." }| 201    |
| authenticate user    | POST   | /users/auth | { email: "...", password: "..." }      | 200    |
| ask for response     | POST   | /conversations/:conversationId/askForResponse | { userId: "...", conversationId: "...", currentConversation: [...] }      | 201    |
| create comment       | PATCH  | /users/posts/:postId/comment | { userId: "...", postId: "...", commentText: "..."  }      | 201    |
| create conversation  | POST   | /users/createConversation | { userId: "...", userInput: "..." }      | 201    |
| create post          | POST   | /users/conversations/:conversationId/newPost | { userId: "...", conversationId: "...", summary: "..." }      | 201    |
| create suggestion    | POST   | /posts/:postId/suggestions/newSuggestion | { userId: "...", postId: "...", title: "...", content: "..." }      | 201    |
| delete all conversations | DELETE   | /conversations/deleteAllConversations | { userId: "..." }      | 204    |
| delete comment       | PATCH  | /posts/:postId/comments/:commentId/delete | { userId: "...", postId: "...", commentId: "..." }      | 204    |
| delete conversation  | DELETE | /conversations/:conversationId/deleteConversation | { userId: "...", conversationId: "..." }      | 204    |
| delete post          | DELETE | /posts/:postId/delete | { userId: "...", postId: "..." }      | 204    |
| delete suggestion    | DELETE | /posts/:postId/suggestions/:suggestionId/delete | { userId: "...", postId: "...", suggestionId: "..." }      | 204    |
| generate summary     | GET    | /users/conversations/:conversationId/generateSummary | { userId: "...", conversationId: "..." }      | 201    |
| hide suggestion      | PATCH  | /suggestions/:suggestionId/hidden | { userId: "...", suggestionId: "..." }      | 200    |
| retrieve conversation | GET    | /users/conversations/:conversationId/conversation | { userId: "...", conversationId: "..." }      | 200    |
| retrieve conversations | GET    | /users/conversations | { userId: "..." }      | 200    |
| retrieve own suggestions | GET    | /ownSuggestions | { userId: "..." }      | 200    |
| retrieve post        | GET    | /users/posts/:postId/post | { userId: "...", postId: "..." }      | 200    |
| retrieve posts       | GET    | /posts | { userId: "..." }      | 200    |
| retrieve post suggestions | GET    | /posts/:postId/postSuggestions | { userId: "...", postId: "..." }      | 200    |
| retrieve saved posts | GET    | /posts/savedPosts | { userId: "..." }      | 200    |
| retrieve searched posts | POST   | /posts/searchedPosts | { userId: "...", textToSearch: "..." }      | 200    |
| retrieve seen posts  | GET    | /posts/seenPosts | { userId: "..." }      | 200    |
| retrieve suggestion  | GET    | /suggestions/:suggestionId | { userId: "...", suggestionId: "..." }      | 200    |
| retrieve user        | GET    | /users/user | { userId: "..." }      | 200    |
| retrieve user posts  | GET    | /users/userPosts | { userId: "..." }      | 200    |
| save post as seen    | PATCH  | /posts/:postId/saveSeenPost | { userId: "...", postId: "..." }      | 200    |
| store input in database | PATCH  | /users/conversations/:conversationId/userInput | { userId: "...", conversationId: "...", userInput: {...} }      | 200    |
| toggle check suggestion | PATCH  | /suggestions/:suggestionId/check | { userId: "...", suggestionId: "..." }      | 200    |
| toggle like post     | PATCH  | /users/posts/:postId/toggleLike | { userId: "...", postId: "..." }      | 200    |
| toggle save post     | PATCH  | /users/posts/:postId/toggleSave | { userId: "...", postId: "..." }      | 200    |
| toggle visibility post | PATCH  | /posts/:postId/togglePostVisibility | { userId: "...", postId: "..." }      | 200    |
| update post          | PATCH  | /users/posts/:postId/updatePost | { userId: "...", postId: "...", title: "...", content: "..." }      | 204    |
| update suggestion    | PATCH  | /suggestions/:suggestionId/editSuggestion | { userId: "...", suggestionId: "...", title: "...", content: "..." }      | 204    |
| update user avatar   | PATCH  | /users/newAvatar | { userId: "...", newAvatarUrl: "...", password: "..." }      | 204    |
| update user password | PATCH  | /users/newPassword | { userId: "...", password: "...", newPassword: "...", newPasswordConfirm: "..." }      | 204    |
...



## Install

INSTALLING ALL DEPENDENCIES
```sh
$ npm install
```

MOCHA
```sh
$ npm init --yes
```

NYC ISTAMBUL
```sh
$ npm i -D nyc
```

EXPRESS
```sh
$ npm i express
```

.ENV
```sh
$ npm i dotenv
```

JSONWEBTOKEN
```sh
$ npm i jsonwebtoken
```

CORS
```sh
$ npm i cors
```

MONGOOSE
```sh
$ npm i mongoose
```

COM
```sh
$ npm i ../com
```

OPENAI
```sh
$ npm i openai
```

## Run API

Start - for running api
```sh
$ npm start
```

Watch - for updating when the api code is changed
```sh
$ npm run watch
```

Inspect - for debbugging, open dedicated DevTools for Node.js
```sh
$ npm run inspect
```


## Testing

Test - for running all mocha tests
```sh
$ npm run test
```

Test-inpsect - for debbugging during tests
```sh
$ npm run test-inspect
```

Test-coverage - for getting the test coverage with istambul dependency
```sh
$ npm run test-coverage
```