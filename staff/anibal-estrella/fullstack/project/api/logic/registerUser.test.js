const mongoose = require('mongoose')
const registerUser = require('./registerUser')
const { User } = require('../data-project/models')

mongoose.connect('mongodb://127.0.0.1:27017/data-project')
    .then(() => mongoose.models.User.countDocuments())
    .then(count => {
        if (count > 0) {
            return mongoose.models.User.deleteMany();
        } else {
            console.log("Collection 'User' is already empty.");
            return Promise.resolve();
        }
    })
    .then(() => registerUser('Eddie Vedder', 'eddiev', 'pj@gmail.com', '123123123', 'barcelona', [41.9301, 2.2549]))
    .catch(error => console.error(error))
    .then(() => console.log("User successfully Created!"))
    .finally(() => mongoose.disconnect())
