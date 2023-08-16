require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');

const { helloApiHandler, retrieveLevelsHandler, retrieveLevelHandler, createLevelHandler, authenticateUserHandler, registerUserHandler, retrieveUserHandler, retrieveUserLoggedHandler, updateColorHandler, updateAvatarHandler, toggleLikeHandler, updatePasswordHandler, recoverPasswordHandler, retrieveRandomRecoveryQuestionHandler, checkRecoveryAnswerHandler, toggleFollowHandler, retrieveLevelsByFollowedHandler, retrieveLevelsByAuthorHandler, retrieveLevelsSavedHandler, toggleSaveHandler, retrieveCompleteAchievementsHandler, updateCreateAchievementsHandler, updateGameAchievementsHandler, updateSocialAchievementsHandler, updateTutorialAchievementsHandler, retrieveCCHandler, updateCCHandler, retrieveUnlockAvatarsHandler, unlockAvatarHandler, updateCCAchievementsHandler } = require('./handlers');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express();
        const server = http.createServer(api);
        const io = new Server(server, {
            cors: {
                //origin: 'http://localhost:5173'
                origin: 'http://13.38.17.11'
            }
        });

        module.exports.io = io;

        const jsonBodyParser = bodyParser.json();

        api.use(cors());

        api.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html');
        });

        api.get('/socket.io/socket.io.js', (req, res) => {
            res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
        });


        /*api.use((req, res, next) => {
            console.log(
                "Request received: url =", req.url,
                "|| method =", req.method,
            );
            next();
        });*/

        api.get('/api', helloApiHandler);

        api.post('/api/levels', jsonBodyParser, createLevelHandler);

        api.get('/api/levels', retrieveLevelsHandler);

        api.get('/api/levels/:levelId', retrieveLevelHandler);

        api.post('/api/users', jsonBodyParser, registerUserHandler);

        api.post('/api/users/auth', jsonBodyParser, authenticateUserHandler);

        api.get('/api/users/:userId', retrieveUserHandler);

        api.get('/api/users/auth/:userId', retrieveUserLoggedHandler);

        api.patch('/api/users/color', jsonBodyParser, updateColorHandler);

        api.patch('/api/users/avatar', jsonBodyParser, updateAvatarHandler);

        api.patch('/api/users/password', jsonBodyParser, updatePasswordHandler);

        api.patch('/api/users/recover', jsonBodyParser, recoverPasswordHandler);

        api.post('/api/users/question', jsonBodyParser, retrieveRandomRecoveryQuestionHandler);

        api.post('/api/users/answer', jsonBodyParser, checkRecoveryAnswerHandler);

        api.patch('/api/levels/like/:levelId', toggleLikeHandler);

        api.patch('/api/levels/save/:levelId', toggleSaveHandler);

        api.patch('/api/users/follow/:userId', toggleFollowHandler);

        api.get('/api/levels/followed/:userId', retrieveLevelsByFollowedHandler);

        api.get('/api/levels/saved/:userId', retrieveLevelsSavedHandler);

        api.get('/api/levels/user/:authorId', retrieveLevelsByAuthorHandler);

        api.get('/api/achievements/:userId', retrieveCompleteAchievementsHandler);

        api.patch('/api/achievements/create', jsonBodyParser, updateCreateAchievementsHandler);

        api.patch('/api/achievements/game', jsonBodyParser, updateGameAchievementsHandler);

        api.patch('/api/achievements/social', updateSocialAchievementsHandler);

        api.patch('/api/achievements/tutorial', updateTutorialAchievementsHandler);

        api.patch('/api/achievements/cc', jsonBodyParser, updateCCAchievementsHandler);

        api.get('/api/users/cc/:userId', retrieveCCHandler);

        api.patch('/api/users/cc', jsonBodyParser, updateCCHandler);

        api.get('/api/users/avatars/:userId', retrieveUnlockAvatarsHandler);

        api.patch('/api/users/avatars', jsonBodyParser, unlockAvatarHandler);

        io.on('connection', (socket) => {
            console.log('a user connected');
            socket.on('sendSocketId', (data) => {
                const frontendSocketId = data.id;
                module.exports.frontendSocketId = frontendSocketId
            });
        });

        server.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`));

    })
    .catch((error) => {
        console.log(error)
    })
