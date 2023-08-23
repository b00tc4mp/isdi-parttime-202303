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

### Users

| Action                     | Method | Path                              | Body                                                     | Status   |
|----------------------------|--------|-----------------------------------|--------------------------------------------------------------------|----------|
| registerUser               | POST   | /api/users                        | { "username": "...", "password": "...", "color": "...", "recoveryQuestions": [] } | 201      |
| authenticateUser           | POST   | /api/users/auth                   | { "username": "...", "password": "..." }                          | 200 or 401 |
| retrieveUser               | GET    | /api/users/:userId                |                                                                    | 200      |
| retrieveUserLogged         | GET    | /api/users/auth/:userId           |                                                                    | 200      |
| updateColor                | PATCH  | /api/users/color                  | { "userId": "...", "color": "..." }                              | 201      |
| updateAvatar               | PATCH  | /api/users/avatar                 | { "userId": "...", "avatar": "..." }                             | 201      |
| updatePassword             | PATCH  | /api/users/password               | { "userId": "...", "newPassword": "...", "oldPassword": "..." } | 201      |
| recoverPassword            | PATCH  | /api/users/recover                | { "username": "...", "newPassword": "..." }                     | 201      |
| retrieveRandomRecoveryQuestion | POST | /api/users/question              | { "username": "..." }                                           |          |
| checkRecoveryAnswer        | POST   | /api/users/answer                 | { "username": "...", "questionId": "...", "answer": "..." }     |          |
| toggleFollow               | PATCH  | /api/users/follow/:userId         |                                                                    | 201      |
| retrieveCC                 | GET    | /api/users/cc/:userId             |                                                                    | 200      |
| updateCC                   | PATCH  | /api/users/cc                    | { "userId": "...", "cc": "...", "operator": "..." }             | 201      |
| retrieveUnlockAvatars      | GET    | /api/users/avatars/:userId        |                                                                    | 200      |
| unlockAvatar               | PATCH  | /api/users/avatars                | { "userId": "...", "avatar": "..." }                             | 201      |
| addRecoveryQuestion        | PATCH  | /api/users/questions              | { "password": "...", "recoveryQuestions": "..." }               | 201      |
| retrieveUser               | GET    | /api/users/:userId                |                                                                    | 200      |
| retrieveUserLogged         | GET    | /api/users/auth/:userId           |                                                                    | 200      |
| searchUsers                | GET    | /api/users/search/:username       |                                                                    | 200      |

### Levels

| Action                     | Method | Path                              | Body                                                      | Status   |
|----------------------------|--------|-----------------------------------|--------------------------------------------------------------------|----------|
| createLevel                | POST   | /api/levels                       | { "name": "...", "layout": "...", "hp": "..." }                   | 201      |
| retrieveLevels             | GET    | /api/levels?sort=[number]&page=[number] |                            | 200      |
| retrieveLevel              | GET    | /api/levels/:levelId              |                                                                    | 200      |
| toggleLike                 | PATCH  | /api/levels/like/:levelId         |                                                                    |          |
| toggleSave                 | PATCH  | /api/levels/save/:levelId         |                                                                    | 201      |
| retrieveLevelsByFollowed   | GET    | /api/levels/followed/:userId      |                                                                    | 200      |
| retrieveLevelsSaved        | GET    | /api/levels/saved/:userId         |                                                                    | 200      |
| retrieveLevelsByAuthor     | GET    | /api/levels/user/:authorId        |                                                                    | 200      |
| editLevel                  | PATCH  | /api/levels/:levelId              | { "name": "...", "layout": "...", "hp": "..." }                   | 201      |
| deleteLevel                | DELETE | /api/levels/:levelId              |                                                                    | 200      |
| searchLevels               | GET    | /api/levels/search/:name          |                                                                    | 200      |

### Achievements

| Action                     | Method | Path                              | Body                                                      | Status   |
|----------------------------|--------|-----------------------------------|--------------------------------------------------------------------|----------|
| retrieveCompleteAchievements| GET   | /api/achievements/:userId         |                                                                    | 200      |
| updateCreateAchievements   | PATCH  | /api/achievements/create          | { "userId": "...", "createData": {...} }                         | 201      |
| updateGameAchievements     | PATCH  | /api/achievements/game            | { "userId": "...", "gameData": {...} }                           | 201      |
| updateSocialAchievements   | PATCH  | /api/achievements/social          |                                                                    | 201      |
| updateTutorialAchievements | PATCH  | /api/achievements/tutorial        |                                                                    | 201      |
| updateCCAchievements       | PATCH  | /api/achievements/cc              | { "userId": "...", "cc": "...", "operator": "..." }             | 201      |

### Others

| Action                     | Method | Path                              | Body                                                     | Status   |
|----------------------------|--------|-----------------------------------|--------------------------------------------------------------------|----------|
| helloApi                   | GET    | /api                              |       | 200
| createSession              | POST   | /api/session/:userId/:socketId    |                                                                    | 201      |
| cleanSession               | PATCH  | /api/session/:userId              |                                                                    | 201      |                                                                    | 200      |

