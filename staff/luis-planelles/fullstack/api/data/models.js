const mongoose = require('mongoose');

const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
  model,
} = mongoose;

const user = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
  },
  avatar: {
    type: String,
    default: null,
  },
  favourites: {
    type: [ObjectId],
    ref: 'Post',
    default: [],
  },
});

const post = new Schema({
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  likes: {
    type: [ObjectId],
    ref: 'User',
    default: [],
  },
});

const User = model('User', user);
const Post = model('Post', post);

module.exports = {
  User,
  Post,
};