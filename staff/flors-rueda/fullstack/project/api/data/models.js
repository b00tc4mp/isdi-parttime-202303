const mongoose = require('mongoose')

const { Schema, model } = mongoose

const level = new Schema({
    name: {
        type: String,
        required: true,
    },
    layout: {
        type: [[String]],
        required: true,
    },

})


const Level = model('Level', level)

module.exports = {
    Level,
}