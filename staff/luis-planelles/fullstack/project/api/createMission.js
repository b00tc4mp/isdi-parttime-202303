require('dotenv').config();
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const { generate } = require('../api/test/helpers');
const { Mission, User } = require('./data/models');

const participant = generate.participant();
const explorer = generate.explorer('monkey');

mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    const user = await User.findOne();

    await Mission.create({
      _id: new ObjectId(),
      creator: user._id,
      traveler: explorer,
      destination: 'moon',
      status: 'success',
      lastUpdate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      participants: [participant],
      loserPrice: 'beer',
    });

    mongoose.disconnect();
  })
  .catch(console.error);
