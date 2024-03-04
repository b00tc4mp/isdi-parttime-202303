const mongoose = require('mongoose')
const createEvent = require('./createEvent')
const { User, Event } = require('../data-project/models')
mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {
        const userId = '64e13fc51dc972550ccb7062';
        const eventId = '64e13fc51dc972550ccb7062';
        const score = '10,99';
        const text = 'Sample Event Description';
        const image = 'https://ik.imagekit.io/7viapifcc/menItrust-01_pXB5yULQm.jpg?updatedAt=1692962625579';

        return createEvent(userId, eventId, image, text, score);
    })
    .then(() => {
        console.log("Event successfully created!");
    })
    .catch(error => {
        console.error("Error creating event:", error);
    })
    .finally(() => {
        mongoose.disconnect();
    });
