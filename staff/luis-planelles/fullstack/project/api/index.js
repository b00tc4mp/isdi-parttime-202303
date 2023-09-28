require('dotenv').config();

const {
  registerUserHandler,
  authenticateUserHandler,
  createMissionHandler,
  participantFeedbackHandler,
  retrieveUserHandler,
  retrieveMissionEventsHandler,
  retrieveMissionHandler,
  retrieveMissionsHandler,
  updateMissionHandler,
} = require('./handlers');

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    let api = express();

    const jsonBodyParser = bodyParser.json();

    api.use(cors());

    // api routes
    api.get('/', (req, res) => res.send('Hello, Space Poursuit.v1!'));

    api.get('/users', retrieveUserHandler);
    api.get('/retrieve-nasa-events/:missionId', retrieveMissionEventsHandler);
    api.get('/missions/:missionId', retrieveMissionHandler);
    api.get('/missions', retrieveMissionsHandler);

    api.post('/users', jsonBodyParser, registerUserHandler);
    api.post('/users/auth', jsonBodyParser, authenticateUserHandler);
    api.post('/missions', jsonBodyParser, createMissionHandler);
    api.post(
      '/participant-feedback/:missionId/:participantId',
      jsonBodyParser,
      participantFeedbackHandler
    );

    api.patch(
      '/missions/update/:missionId',
      jsonBodyParser,
      updateMissionHandler
    );

    api.listen(process.env.PORT, () =>
      console.log(`server running in port ${process.env.PORT}`)
    );
  })
  .catch(console.error);
