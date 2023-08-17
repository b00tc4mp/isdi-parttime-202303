# Ballopolis Maze Riders: API
Api for the ballopolis web app.

## Technologies:

- Node & Express
- MongoDB & Mongoose
- Mocha Chai
- Socket.io

## Setup

### Requirements

- NodeJs
- MongoDB

### Install
```sh
npm i
```

### Run tests
- make sure to set the env variable of the database to test

```sh
npm run test
```

### Run test coverage
- make sure to set the env variable of the database to test

```sh
npm run test-coverage
```

### Run
```sh
npm run start
```
## API Endpoints

| Action                      | Method | Path                  | Body Example               | Status   |
|-----------------------------|--------|-----------------------|----------------------------|----------|
| helloApi              | GET    | /api                  | N/A                        | 200      |
| createLevel           | POST   | /api/levels           | { "name": "...", "layout": "...", "hp": "...", "author": "..." } | 201      |
| retrieveLevels        | GET    | /api/levels           | N/A                        | 200      |
| retrieveLevel         | GET    | /api/levels/:levelId  | N/A                        | 200      |
| registerUser          | POST   | /api/users            | { "username": "...", "password": "...", "color": "...", "recoveryQuestions": [] } | 201 |
| authenticateUser      | POST   | /api/users/auth       | { "username": "...", "password": "..." } | 200 or 401 |
| retrieveUser          | GET    | /api/users/:userId    | N/A                        | 200      |
| retrieveUserLogged    | GET    | /api/users/auth/:userId | N/A                      | 200      |
| updateColor           | PATCH  | /api/users/color      | { "userId": "...", "color": "..." } | 201      |
| updateAvatar          | PATCH  | /api/users/avatar     | { "userId": "...", "avatar": "..." } | 201      |
| updatePassword        | PATCH  | /api/users/password   | { "userId": "...", "newPassword": "...", "oldPassword": "..." } | 201      |
| recoverPassword       | PATCH  | /api/users/recover    | { "username": "...", "newPassword": "..." } | 201      |
| retrieveRandomRecoveryQuestion  | POST | /api/users/question | { "username": "..." }     | N/A      |
| checkRecoveryAnswer   | POST   | /api/users/answer     | { "username": "...", "questionId": "...", "answer": "..." } | N/A |
| toggleLike            | PATCH  | /api/levels/like/:levelId | N/A                  | N/A      |
| toggleSave            | PATCH  | /api/levels/save/:levelId | N/A                  | 201      |
| toggleFollow          | PATCH  | /api/users/follow/:userId | N/A                  | 201      |
| retrieveLevelsByFollowed  | GET | /api/levels/followed/:userId | N/A              | 200      |
| retrieveLevelsSaved   | GET    | /api/levels/saved/:userId | N/A                   | 200      |
| retrieveLevelsByAuthor  | GET  | /api/levels/user/:authorId | N/A                 | 200      |
| retrieveCompleteAchievements  | GET | /api/achievements/:userId | N/A            | 200      |
| updateCreateAchievements  | PATCH | /api/achievements/create | { "userId": "...", "createData": {...} } | 201 |
| updateGameAchievements  | PATCH | /api/achievements/game | { "userId": "...", "gameData": {...} } | 201 |
| updateSocialAchievements  | PATCH | /api/achievements/social | N/A                | 201      |
| updateTutorialAchievements  | PATCH | /api/achievements/tutorial | N/A              | 201      |
| updateCCAchievements  | PATCH | /api/achievements/cc   | { "userId": "...", "cc": "...", "operator": "..." } | 201 |
| retrieveCC            | GET    | /api/users/cc/:userId | N/A                        | 200      |
| updateCC              | PATCH  | /api/users/cc         | { "userId": "...", "cc": "...", "operator": "..." } | 201 |
| retrieveUnlockAvatars  | GET   | /api/users/avatars/:userId | N/A                | 200      |
| unlockAvatar          | PATCH  | /api/users/avatars    | { "userId": "...", "avatar": "..." } | 201      |
| retrieveUser          | GET    | /api/users/:userId    | N/A                        | 200      |
| retrieveUserLogged    | GET    | /api/users/auth/:userId | N/A                      | 200      |
