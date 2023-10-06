# Space Pursuit

Space Pursuit is a Node.js web application that allows users to create private bets between users by sending a monkey, robot or dog on a mission to different planets. Users can decide whether to send the tripulant to the moon, mars, or an unexplored planet. The success of the mission is determined by connecting with NASA notifications. Anonymous users can follow the explorer's journey in real-time on a dedicated page.

![](https://cdn.dribbble.com/users/395680/screenshots/2149726/rocket-animation.gif)

## Features

- User registration and authentication
- Create private missions and accept bets
- Real-time tracking of the mission
- Traveler status tracking (health, food, water, stress, oxygen)
- Fetching events from NASA API
- User profiles and mission history
- Belt between selected users with loser's price

## Funcional description

### Use cases

- chose traveler
- chose destination
- update profile
- travel bets
- follow trip page

## Technical description

- Node.js
- Express.js
- MongoDB with Mongoose
- React
- Tailwind
- CSS
- NASA API

### Data Model

#### User

- `name`: User's username (string). Required. Unique.
- `email`: User's email address (string). Required. Unique.
- `password`: User's password (string). Required.
- `avatar`: A string representing the avatar or profile picture of the user. Default: null.

#### Participant

- `name`: User's username (string). Required. Unique.
- `confirmation`: A string representing the participant anwser to invitation. Must be one of the following values: 'accept', 'decline', 'pending'. Default 'pending'.
- `feedback`: A string representing the participant feedback.

#### Mission

- `traveler`: The "Explorer" associated with the mission. Required.
- `creator`: Object ID (ObjectId) referring to the "User" who created the mission. Required.
- `creatorName`: A string representing the name of the mission creator. Required.
- `destination`: A string representing the destination of the mission. Must be one of the following values: 'moon', 'mars', 'unexplored_planet'. Required.
- `status`: A string representing the status of the mission. Must be one of the following values: 'in_progress', 'success', 'failure'. Default: in_progress.
- `lastUpdate`: A Date field representing the date of the last update for the mission. Default: Date.now.
- `startDate`: A Date field representing the start date of the mission. Required.
- `endDate`: A Date field representing the end date of the mission. Required.
- `participants`: An array of "Participant" associated in the mission. Required.
- `processedEvents`: An array of Object Id referring to the "nasaEvents" already processed by the mission.
- `loserPrice`: A string representing the loser's prize for the mission. Required.

#### Explorer

- `race`: A string representing the race of the explorer. Must be one of the following values: 'monkey', 'robot', 'dog'. Required.
- `health`: A number representing the health status of the explorer. Required.
- `food`: A number representing the food level of the explorer. Required.
- `water`: A number representing the water level of the explorer. Required.
- `stress`: A number representing the stress level of the explorer. Required.
- `oxygen`: A number representing the oxygen level of the explorer. Required.

#### NasaEvent

- `date`: A Date field representing the date of the NASA event. Required.
- `event`: A string representing the type of the NASA event. Required.
- `link`: A string representing the link of event of the nasa.

#### ApiCall

- `lastUpdate`: A Date field representing the date of the last update for the api Nasa. Required.

## Planning

Task breakdown and progress tracking in [Trello.](https://trello.com/b/CmBbNAni/space-pursuit)

### API Endpoints

- `GET /` - Get app name and version
- `GET /missions/:id` - Get a specific mission
- `GET /missions/update/:id` - Get a specific mission updated.
- `GET /retrieve-mission-events/:missionId` - Get events during mission.
- `GET /retrieve-participant/:missionId/:participantId` - Get a specific participant in mission.

- `POST /users` - Register a new user
- `POST /users/auth` - Log in a user
- `POST /missions` - Create a new mission
- `POST /participant-feedback/:missionId/:participantId` - Participant feedback on mission`

- `PATCH /missions/update/:missionId` - Update mission in iteracting with Nasa data.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Acknowledgments

- Thanks to the NASA API for providing event data.
