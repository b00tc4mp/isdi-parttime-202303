const mongoose = require('mongoose')

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const GeoJSON = require('mongoose-geojson-schema')

const user = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    avatar: {
        type: String
    },
    favs: {
        type: [ObjectId],
        ref: 'Workspot'
    }
})

const district = new Schema({
    ciutatVella: Boolean,
    gracia: Boolean,
    horta: Boolean,
    lEixample: Boolean,
    lesCorts: Boolean,
    nouBarris: Boolean,
    santAndreu: Boolean,
    santMarti: Boolean,
    santsMontjuic: Boolean,
    sarriaSantGervasi: Boolean,
})

const mapLocation = new Schema({
    location: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
            required: true
    }
})

const wifi = new Schema({
    unlimitedFree: Boolean,
    timeLimited: Boolean,
    timeLimitedWithPurchase: Boolean,
    paidOptions: Boolean,
    unavailable: Boolean,
})

const plugs = new Schema({
    none: Boolean,
    few: Boolean,
    plenty: Boolean,
})

const noise = new Schema({
    quiet: Boolean,
    moderate: Boolean,
    loud: Boolean,
})

const otherFeatures = new Schema({
    accessibility: Boolean,
    petFriendly: Boolean,
    ensuiteKitchen: Boolean,
    onSiteRestaurant: Boolean,
    meetingRooms: Boolean,
    parking: Boolean,
    bikeRack: Boolean,
    storage: Boolean,
    printScanCopy: Boolean,
    projector: Boolean,
    windowView: Boolean,
})

const location = new Schema({
    street: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        default: 'Point',
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    districts: {
        type: district,
        required: true,
    },
    mapLocation: {
        type: mapLocation,
        required: true,
    }
})

const review = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const workspot = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: location,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        coffeeShop: Boolean,
        restaurant: Boolean,
        coWorking: Boolean,
        library: Boolean,
        hotelLobby: Boolean,
    },
    features: {
        wifi: wifi,
        plugs: plugs,
        noise: noise,
        otherFeatures: otherFeatures
    },
    reviews: {
        type: review,
        ref: 'User',
    },
    likes: {
        type: [ObjectId],
        ref: 'User'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const User = model('User', user)
const Workspot = model('Workspot', workspot)

module.exports = {
    User,
    Workspot,
}