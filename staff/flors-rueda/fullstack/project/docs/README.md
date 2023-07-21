# Ballopolis Maze Riders


![](./img/logo.gif)

# Intro
This is a web app build as the final project for the ISDI Coders' online web development fullstack bootcamp.
</br>
</br>
Ballopolis is meant to be a social game, where you create levels that are fun and challenging to beat for other players.
</br>
</br>
In doing so, you earn achivements to add to your profile and show off to your friends and other users.
</br>
</br>
To create those levels you need to earn Customization Credits by playing other people levels.
</br>
</br>
So YOU play levels to earn points to create levels that other people will play to earn points to create levels that YOU will play!
</br>
And that's the loop in which this game lives...
</br>
</br>

# Functional description

## Use cases

- create level
- edit level
- play level
- earn achivements
- toggle like level
- see other users achivements
- see other users created levels
</br>
</br>

# Technical description

## Technologies & Libraries

- React
- Vite
- Three JS
- Tailwind
- React-Lottie
- Bootstrap-icons
- Node
- Express
- MongoDB and Mongoose
- Mocha Chai *for backend testing*
</br>
</br>


## Data model

Level
- id (uuid)
- name (string)
- layout (matrix of strings)
</br>
</br>

## Test Coverage

</br>

File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------|---------|----------|---------|---------|-------------------
All files               |   94.25 |    66.66 |   94.44 |   97.56 | 
 data                   |     100 |      100 |     100 |     100 | 
  models.js             |     100 |      100 |     100 |     100 | 
 logic/helpers/tests    |     100 |      100 |     100 |     100 |                   
  cleanUp.js            |     100 |      100 |     100 |     100 | 
  generate.js           |     100 |      100 |     100 |     100 | 
  index.js              |     100 |      100 |     100 |     100 | 
 logic/levels           |      90 |       50 |   85.71 |   94.73 | 
  createLevel.js        |   85.71 |      100 |      50 |   85.71 | 21                
  retrieveLevel.js      |    87.5 |       50 |     100 |     100 | 11
  retrieveLevels.js     |     100 |      100 |     100 |     100 | 
 logic/users            |   94.23 |       70 |     100 |   97.91 | 
  authenticateUser.js   |     100 |      100 |     100 |     100 | 
  registerUser.js       |   94.11 |       50 |     100 |   94.11 | 33
  retrieveUser.js       |      90 |       50 |     100 |     100 | 12
  retrieveUserLogged.js |      90 |       50 |     100 |     100 | 12

</br>

# Planning

Planned through a kanban visible on this [Trello](https://trello.com/b/uHRmZKBR/final-project-ballopolis).
</br>
</br>

## Epics & Stories

### **Demo page**

- Me as a user, I want to see a basic page where i can try the main functionalities and learn about the app

#### Tasks

- [x] Build landing page
- [x] Build levels list page
- [x] Build on game page
- [x] Build create level page
- [x] Build about page
- [x] Build tutorials for the game
- [x] Implement create level functionality
- [x] Implement retrieve all levels functionality
- [x] Implement retrieve one level functionality
- [x] Use TDD to add validators
- [x] Improve error handling
- [x] Improve GameOver modal style
- [x] Improve UX of the create level form
- [x] Upload the page to AWS

### **Access control**

- Me as a user, I want to get the chance to sign up and log in into the web app and with that access more functionalities

#### Tasks

- [ ] Build login page
- [ ] Build register page
- [ ] Create tests for register user
- [ ] Create tests for authenticate user
- [ ] Create tests for retrieve user
- [ ] Implement register user functionality
- [ ] Implement authenticate user with token
- [ ] Implement retrieve user
- [ ] Make levels view only accessible for log in users
- [ ] Only allow logged in users to post levels
- [ ] Add a create and test level on tutorial (no posting)
- [ ] Differenciate navbar for authenticate users
- [ ] Add logout and delete token

</br>
</br>

# Project setup
## App
[Click here >>](../app/README.md)

## Api
[Click here >>](../api/README.md)

## Com
[Click here >>](../com/README.md)

</br>
</br>

# Project AWS Update

Github, through github actions, updates the image on push. It's automatic, but could fail. So always check for errors first.

Go to EC2, connect to the machine. Check the ip of the instance and keep it update, then run:
```sh
$ docker-compose down # only if it was already running
$ sudo docker system prune -a # to clean local cache
$ sudo docker-compose up -d # run services on deamon mode
```

To know more about how this project was deployed on AWS [click here!](./awsconfig.md)

