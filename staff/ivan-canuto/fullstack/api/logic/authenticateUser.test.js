require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const authenticateUser = require('./authenticateUser')

mongoose.connect(process.env.MONGODB_URL)
  // .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  .then(() => authenticateUser('mon@goose.com', '123123123'))
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoose.disconnect())