require('dotenv').config()

const mongoose = require('mongoose')
const { User, Post } = require('../data/models')
const registerUser = require('./registerUser')

mongoose.connect(process.env.MONGO_URL)
  // .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
  .then(() => registerUser('Iván', 'canutosorianoivan@gmail.com', '123123123'))
  .then(console.log)
  .catch(console.error)
  .finally(() => mongoose.disconnect())