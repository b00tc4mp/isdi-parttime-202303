# Ballopolis Maze Riders


![](./img/logo.gif)

# Intro
blah blah blah
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
 logic/levels        |   95.45 |       50 |     100 |     100 | 
  createLevel.js     |     100 |      100 |     100 |     100 | 
  retrieveLevel.js   |    87.5 |       50 |     100 |     100 | 10
  retrieveLevels.js  |     100 |      100 |     100 |     100 | 
</br>

# Planning

Planned through a kanban visible on this [Trello](https://trello.com/b/uHRmZKBR/final-project-ballopolis).
</br>
</br>

## Epics & Stories

### **Demo page**

- Me as a user, I want to see a basic page where i can try the main functionalities and learn about the app

#### Tasks

- [ ] Build landing page
- [x] Build levels list page
- [x] Build on game page
- [x] Build create level page
- [ ] Build about page
- [ ] Build tutorials for the game
- [x] Implement create level functionality
- [x] Implement retrieve all levels functionality
- [x] Implement retrieve one level functionality
- [ ] Use TDD to add validators
- [ ] Improve error handling
- [ ] Improve GameOver modal style
- [ ] Improve UX of the create level form
- [ ] Upload the page to AWS

</br>
</br>

# Project setup
## App
[Click here >>](../app/README.md)

## Api
[Click here >>](../api/README.md)

## Com
[Click here >>](../com/README.md)
