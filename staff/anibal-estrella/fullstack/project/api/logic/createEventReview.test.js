const mongoose = require('mongoose')
const createEvent = require('./createEvent')
const { User, Event } = require('../data-project/models')
mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => {
        const userId = '64e13fc51dc972550ccb7062';
        const eventId = '64e13fc51dc972550ccb7062';
        const image = 'https://ik.imagekit.io/7viapifcc/menItrust-01_pXB5yULQm.jpg?updatedAt=1692962625579';
        const text = 'Sample Event Description';
        const lineUp = ['175395'];
        const dates = [new Date()];
        const place = 'Sample Event Place';
        const price = '10,99';

        return createEvent(userId, eventId image, text, lineUp, dates, place, price);
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
