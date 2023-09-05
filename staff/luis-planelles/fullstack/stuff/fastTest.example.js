require('dotenv').config();

const mongoose = require('mongoose');
const { User, Post } = require('../api/data/models');
const registerUser = require('../api/logic/registerUser');

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  .then(() => registerUser('Peter Pan', 'peter@pan.com', '123123123'))
  .catch((error) => console.error(error))
  .finally(() => mongoose.disconnect());