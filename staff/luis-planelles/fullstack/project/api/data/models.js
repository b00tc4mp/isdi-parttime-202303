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
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
});

const explorer = new Schema({
  race: {
    type: String,
    enum: ['monkey', 'robot', 'dog', 'billionaire'],
    required: true,
  },
  health: {
    type: Number,
    default: 100,
    required: true,
  },
  food: {
    type: Number,
    default: 100,
    required: true,
  },
  water: {
    type: Number,
    default: 100,
    required: true,
  },
  stress: {
    type: Number,
    default: 100,
    required: true,
  },
  oxygen: {
    type: Number,
    default: 100,
    required: true,
  },
});

const participant = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

const mission = new Schema({
  creator: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  traveler: {
    type: [explorer],
    required: true,
  },
  destination: {
    type: String,
    enum: ['moon', 'mars', 'unexplored_planet'],
    required: true,
  },
  status: {
    type: String,
    enum: ['in_progress', 'success', 'failure'],
    default: 'in_progress',
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  participants: {
    type: [participant],
    required: true,
  },
  loserPrice: {
    type: String,
    required: true,
  },
});

const nasaEvent = new Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
});

const nasaData = new Schema({
  events: {
    type: [nasaEvent],
  },
  lastUpdate: {
    type: Date,
    required: true,
  },
});

const User = model('User', user);
const Mission = model('Mission', mission);
const Explorer = model('Explorer', explorer);
const Participant = model('Participant', participant);
const NASAEvent = model('NASAEvent', nasaEvent);
const NasaData = model('NasaData', nasaData);

module.exports = {
  User,
  Mission,
  Explorer,
  Participant,
  NASAEvent,
  NasaData,
};
