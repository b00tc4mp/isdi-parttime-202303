require ('dotenv').config()
const mongoose = require('mongoose')
const updateWorkspot = require('./updateWorkspot.js')

const userId = "64f7d4be463b34a38092c588"
const workspotId = "64f7cf5b4acc7fc154a37e77"
const image = 'https://images.squarespace-cdn.com/content/v1/62f1252f8bfa06437d10ed94/16c11498-0135-43b1-8dd3-7d8bec4585c1/La+Galena+Barcelona?format=2500w'
const name = 'La Galena UPDATED'
const coordinates = [41.37273090025529, 2.1627087992196485]
const location = {
    street: 'Plaça del Sortidor, 18',
    postalCode: '08004',
    city: 'Barcelona',
    country: 'Spain',
    districts: {
        ciutatVella: false,
        gracia: false,
        horta: false,
        lEixample: false,
        lesCorts: false,
        nouBarris: false,
        santAndreu: false,
        santMarti: false,
        santsMontjuic: true,
        sarriaSantGervasi: false,
    },
    mapLocation: {
        location: 'Point',
        coordinates: coordinates,
    },
}
const description = 'Poble Sec hasn’t exactly been booming with great cafes and brunch places, but La Galena has changed that. This adorable cafe has opened on Plaça Sortidor and has taken the neighborhood by storm.'
const category = {
    coffeeShop: true,
    restaurant: false,
    coWorking: false,
    library: false,
    hotelLobby: false
}
const features = {
    wifi: {
        unlimitedFree: false,
        timeLimited: false,
        timeLimitedWithPurchase: true,
        paidOptions: false,
        unavailable: false,
    },
    plugs: {
        none: false,
        few: true,
        plenty: false,
    },
    noise: {
        quiet: true,
        moderate: false,
        loud: false,
    },
    otherFeatures: {
        accessibility: true,
        petFriendly: true,
        ensuiteKitchen: false,
        onSiteRestaurant: false,
        meetingRooms: false,
        parking: false,
        bikeRack: false,
        storage: false,
        printScanCopy: false,
        projector: false,
        windowView: true,
    }
}

mongoose.connect(process.env.MONGODB_URL)
    .then(() => updateWorkspot(userId, workspotId, image, name, location, description, category, features))
    .then(console.log)
    .catch(console.error)
    .finally(() => mongoose.disconnect())

