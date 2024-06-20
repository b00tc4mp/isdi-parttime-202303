require('dotenv').config()
const mongoose = require('mongoose')
const retrieveFavWorkspots = require('./retrieveFavWorkspots')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => retrieveFavWorkspots("64f7d4be463b34a38092c587"))
    .then(workspots => console.log(workspots))
    .catch(console.error)
    .finally(mongoose.disconnect)