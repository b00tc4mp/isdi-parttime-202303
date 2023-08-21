require('dotenv').config()
const mongoose = require('mongoose')
const getWorkspotsByName = require('./getWorkspotsByName')

mongoose.connect("mongodb://127.0.0.1:27017/data")
    .then(() => getWorkspotsByName("64ac41995182768d587b4580", "Galena"))
    .then(workspots => console.log(workspots))
    .catch(console.error)
    .finally(mongoose.disconnect)
