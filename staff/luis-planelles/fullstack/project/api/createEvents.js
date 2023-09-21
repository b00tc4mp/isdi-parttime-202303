require('dotenv').config();
const mongoose = require('mongoose');

const { NasaEvent } = require('./data/models');

// massEjection = water_damage => 10
// geoStorm = food_damage => 20
// planetShock = food_damage => 25
// solarFlare = water_damage => 10
// solarParticle = water_damage => 30
// magnetoPause = oxygen_damage => 50
// radiationBelt = oxygen_damage => 50
// speedSteam  = oxygen_damage => 50

const events = [
  'massEjection',
  'geoStorm',
  'planetShock',
  'solarFlare',
  'solarParticle',
  'magnetoPause',
  // 'radiationBelt',
  // 'speedSteam',
];

const date = new Date();

date.setDate(date.getDate() + 1);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    const createEvent = async (events, date) => {
      const nasaEventPromises = events.map((event) => {
        return NasaEvent.create({
          date,
          event,
          link: 'https://link-to-event.com',
        });
      });

      await Promise.all(nasaEventPromises);
    };

    await createEvent(events, date);

    mongoose.disconnect();
  })
  .catch(console.error);
