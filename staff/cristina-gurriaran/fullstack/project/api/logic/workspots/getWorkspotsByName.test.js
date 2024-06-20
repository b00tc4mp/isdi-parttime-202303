require('dotenv').config()
const mongoose = require('mongoose')
const getWorkspotsByName = require('./getWorkspotsByName')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => getWorkspotsByName("64f7ca9d75c2fa49950ab36e", "galena"))
    .then(workspots => console.log(workspots))
    .catch(console.error)
    .finally(mongoose.disconnect)
