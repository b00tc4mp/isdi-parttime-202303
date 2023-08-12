require('dotenv').config()
const mongoose = require('mongoose')
const retrieveWorkspots = require('./retrieveWorkspots')

mongoose.connect("mongodb://127.0.0.1:27017/data")
    .then(() => retrieveWorkspots("64ac41995182768d587b4580"))
    .then(workspots => console.log(workspots))
    .catch(console.error)
    .finally(mongoose.disconnect)
