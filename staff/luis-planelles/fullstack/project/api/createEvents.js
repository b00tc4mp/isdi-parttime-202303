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

const date = new Date();

date.setDate(currentDate.getDate() + 1);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    const createEvent = async (events, startDateEvent) => {
      const nasaEventPromises = events.map((event) => {
        return NasaEvent.create({
          date,
          event,
          link: 'https://link-to-event.com',
        });
      });

      await Promise.all(nasaEventPromises);
    };

    await createEvent(events, currentDate);

    mongoose.disconnect();
  })
  .catch(console.error);
