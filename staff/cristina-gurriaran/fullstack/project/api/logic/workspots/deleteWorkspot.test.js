require('dotenv').config()

const mongoose = require('mongoose')
const { User, Workspot } = require('../../data/models')
const deleteWorkspot = require('./deleteWorkspot')

mongoose.connect("mongodb://127.0.0.1:27017/data")
    .then((user, workspot) => deleteWorkspot("64ac41995182768d587b4580", "64e7eda90c8dd847668e313b"))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())

