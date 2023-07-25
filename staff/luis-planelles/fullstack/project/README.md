# Space Monkey

Space Monkey is a Node.js web application that allows users to create private bets between users by sending a monkey on a mission to different planets. Users can decide whether to send the monkey to the moon, mars, or an unexplored planet. The success of the mission is determined by connecting with NASA notifications. Anonymous users can follow the monkey's journey in real-time on a dedicated page.

## Features

- User registration and authentication
- Create private missions and accept bets
- Real-time tracking of the monkey's mission
- Monkey status tracking (health, food, water, stress, oxygen)
- Fetching events from NASA API
- User profiles and mission history
- Belt between selected users with loser's price

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Tailwind CSS
- NASA API

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB database connection

### API Endpoints

- `POST /api/register` - Register a new user
- `POST /api/login` - Log in a user
- `POST /api/missions` - Create a new mission
- `GET /api/missions/:id` - Get a specific mission

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Acknowledgments

- Thanks to the NASA API for providing event data.
