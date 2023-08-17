# Ballopolis Maze Riders

![](./img/logo.gif)

## Intro
This is a web app build as the final project for the ISDI Coders' online web development fullstack bootcamp.
</br>
</br>
Ballopolis is meant to be a social game, where you create levels that are fun and challenging to beat for other players.
</br>
</br>
In doing so, you earn achivements to add to your profile and show off to other users.
</br>
</br>
To create those levels you need to earn Customization Credits by playing other people levels.
</br>
</br>
So you play levels to earn points to create levels that other people will play to earn points to create levels that you will play!
</br>
</br>

## Functional description

### Use cases

- create level
- play level
- earn achivements
- toggle like level
- follow users
- see other users achivements
- see other users created levels
- customize your avatar
</br>
</br>

## UI desgin

- TODO Link to figma or wizardUI or whatever

## Technical description

### Technologies & Libraries

- React
- Vite
- Three JS
- Tailwind
- React-Lottie
- Bootstrap-icons
- Node
- Express
- MongoDB and Mongoose
- Socket.IO
- Mocha Chai *for backend testing*
</br>
</br>


### Data models

**Level**
- id (oid)
- name (string)
- layout (matrix of strings)
- health ppints (number)
- author (user oid)
- likes (array of oid)
- date (date)

**User**
- id (oid)
- username (string)
- password (string)
- avatar (string)
- unlockAvatars (array of strings)
- color (string)
- recovery questions (array of objects)
- joined (dates)
- saves (array of oid)
- follows (array of oid)
- followers (array of oid)
- customization credits (number)

**Achivements**
- user (oid)
- progressByAchivement (array of objects)
</br>
*progressByAchivement* 
- code (string)
- name (string)
- description (string)
- category (string)
- ranks (array of numbers)
- progress (number)
- isRankBronzeReached (boolean)
- isRankSilverReached (boolean)
- isRankGoldReached (boolean)
</br>
</br>

### Test Coverage

</br>

File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------|---------|----------|---------|---------|-------------------
All files                           |   98.72 |       90 |   98.59 |   98.61 | 
 data                               |     100 |      100 |     100 |     100 | 
  achievements.js                   |     100 |      100 |     100 |     100 | 
  models.js                         |     100 |      100 |     100 |     100 | 
 logic/achievements                 |    97.1 |    87.83 |     100 |   96.87 | 
  retrieveCompleteAchievements.js   |     100 |      100 |     100 |     100 | 
  updateCCAchievements.js           |     100 |       95 |     100 |     100 | 46
  updateCreateAchievements.js       |      96 |    83.33 |     100 |   95.65 | 44
  updateGameAchievements.js         |      96 |    83.33 |     100 |   95.65 | 45
  updateSocialAchievements.js       |   95.83 |    85.71 |     100 |   95.65 | 50
  updateTutorialAchievements.js     |   95.83 |       80 |     100 |   95.45 | 40
 logic/helpers                      |     100 |    93.75 |     100 |     100 | 
  updateAchievementsProgress.js     |     100 |    93.75 |     100 |     100 | 12
 logic/helpers/tests                |     100 |      100 |     100 |     100 | 
  cleanUp.js                        |     100 |      100 |     100 |     100 | 
  generate.js                       |     100 |      100 |     100 |     100 |                   
  index.js                          |     100 |      100 |     100 |     100 | 
 logic/levels                       |   98.79 |    88.88 |      95 |   98.71 | 
  createLevel.js                    |      90 |      100 |      50 |      90 | 32
  retrieveLevel.js                  |     100 |      100 |     100 |     100 | 
  retrieveLevels.js                 |     100 |      100 |     100 |     100 | 
  retrieveLevelsByAuthor.js         |     100 |      100 |     100 |     100 | 
  retrieveLevelsByFollowed.js       |     100 |      100 |     100 |     100 | 
  retrieveLevelsSaved.js            |     100 |      100 |     100 |     100 | 
  toggleLike.js                     |     100 |     87.5 |     100 |     100 | 25
  toggleSave.js                     |     100 |     87.5 |     100 |     100 | 25                
 logic/users                        |   99.52 |     92.3 |     100 |   99.47 | 
  authenticateUser.js               |     100 |      100 |     100 |     100 | 
  checkRecoveryAnswer.js            |     100 |      100 |     100 |     100 | 
  recoverPassword.js                |     100 |      100 |     100 |     100 |                   
  registerUser.js                   |   95.65 |       50 |     100 |   95.65 | 60
  retrieveCC.js                     |     100 |      100 |     100 |     100 | 
  retrieveRandomRecoveryQuestion.js |     100 |      100 |     100 |     100 | 
  retrieveUnlockAvatars.js          |     100 |      100 |     100 |     100 | 
  retrieveUser.js                   |     100 |      100 |     100 |     100 | 
  retrieveUserLogged.js             |     100 |      100 |     100 |     100 | 
  toggleFollow.js                   |     100 |       80 |     100 |     100 | 25-26             
  unlockAvatar.js                   |     100 |      100 |     100 |     100 | 
  updateAvatar.js                   |     100 |      100 |     100 |     100 | 
  updateCC.js                       |     100 |    83.33 |     100 |     100 | 25
  updateColor.js                    |     100 |      100 |     100 |     100 | 
  updatePassword.js                 |     100 |      100 |     100 |     100 |

</br>

## Planning

Planned through a kanban visible on this [Trello](https://trello.com/b/uHRmZKBR/final-project-ballopolis).
</br>
</br>

### Epics & Stories

#### **Demo page**

- Me as a user, I want to see a basic page where i can try the main functionalities and learn about the app

#### **Access control**

- Me as a user, I want to get the chance to sign up and log in into the web app and with that access more functionalities

#### **User views**
- Me as a user, I want to have te option to update privacy settings and customize my profile.

#### **Achivement**
- Me as a user, I want to get little awards that stimulate me to keep playing and interact with other users.

#### **Customization Credits**
- Me as auser, I want to earn point when I play that I can spend to create more levels or customize my profile

</br>

## Project setup
This project is configured to run both in local or through EC2 on AWS. To know more [click here](./project-setup.md).