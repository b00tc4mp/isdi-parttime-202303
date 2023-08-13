require('dotenv').config()
const mongoose = require('mongoose')
const retrieveWorkspots = require('./retrieveWorkspots')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => retrieveWorkspots("64ac41995182768d587b4580"))
    .then(workspots => console.log(workspots))
    .catch(console.error)
    .finally(mongoose.disconnect)
