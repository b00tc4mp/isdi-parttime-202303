require('dotenv').config()

const mongoose = require('mongoose')
const toggleFavPost = require('./toggleFavPost')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => toggleFavPost('64ac3076cca3c7f9cdb065b0', '64ac3d8a55a38267c51f7743'))
    .then(posts => console.log(posts))
    .catch(console.error)
    .finally(mongoose.disconnect)





