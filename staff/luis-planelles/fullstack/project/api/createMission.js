require('dotenv').config();

const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { generate } = require('../api/test/helpers');
const { Mission, User } = require('./data/models');

const participant = generate.participant();
participant.name = 'hulk';
const explorer = generate.explorer('monkey');

const currentDate = new Date();
const fiveMinutesLater = new Date(currentDate.getTime() + 3 * 60000);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    const user = await User.findOne();

    await Mission.create({
      _id: new ObjectId(),
      creator: user._id,
      creatorName: user.name,
      traveler: explorer,
      destination: 'moon',
      status: 'in_progress',
      lastUpdate: new Date(),
      startDate: new Date(),
      endDate: fiveMinutesLater,
      participants: [participant],
      processedEvents: [],
      loserPrice: 'beer',
      archived: false,
    });

    mongoose.disconnect();
  })
  .catch(console.error);
