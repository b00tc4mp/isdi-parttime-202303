require('dotenv').config();
const mongoose = require('mongoose');

const { NasaEvent } = require('./data/models');

const events = [
  'massEjection',
  'geoStorm',
  'planetShock',
  'solarFlare',
  'solarParticle',
  'magnetoPause',
  'radiationBelt',
  'speedSteam',
];
const startDateEvent = '2023-09-14';

mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    const createEvent = async (events, startDateEvent) => {
      const nasaEventPromises = events.map((event) => {
        return NasaEvent.create({
          date: new Date(startDateEvent),
          event,
          link: 'https://link-to-event.com',
        });
      });

      await Promise.all(nasaEventPromises);
    };

    await createEvent(events, startDateEvent);

    mongoose.disconnect();
  })
  .catch(console.error);
