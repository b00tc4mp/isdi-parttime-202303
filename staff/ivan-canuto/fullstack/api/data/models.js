const mongoose = require('mongoose')
const { Schema, mongoose: { Types: { ObjectId } }, model } = mongoose

const user = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6
  },
  avatar: {
    type: String
  },
  favs: {
    type: [ObjectId],
    ref: 'Post'
  }
})

const comment = new Schema({
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

const post = new Schema({
  author: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  likes: {
    type: [ObjectId],
    ref: 'User'
  },
  visible: {
    type: Boolean,
    default: true,
  },
  onSale: {
    type: mongoose.Schema.Types.Mixed,
    validate: {
      validator: function(value) {
        return typeof value === 'string' || value === null;
      },
      message: 'The onSale field must be null or a string.'
    },
    default: null
  },
  comments: {
    type: [comment],
    default: []
  }
})

const User = model('User', user)
const Post = model('Post', post)
const Comment = model('Comment', comment)

module.exports = {
  User,
  Post,
  Comment
}