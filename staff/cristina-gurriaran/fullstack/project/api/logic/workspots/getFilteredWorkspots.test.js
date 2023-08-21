require('dotenv').config()
const mongoose = require('mongoose')
const getFilteredWorkspots = require('./getFilteredWorkspots')

const userId = "64ac3076cca3c7f9cdb065b0"

const districts = {
    ciutatVella: true,
    gracia: false,
    horta: false,
    lEixample: false,
    lesCorts: false,
    nouBarris: false,
    santAndreu: false,
    santMarti: false,
    santsMontjuic: false,
    sarriaSantGervasi: false,
}

const features = {
    wifi: {
        unlimitedFree: false,
        timeLimited: false,
        timeLimitedWithPurchase: true,
        paidOptions: false,
        unavailable: false,
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
        windowView: false,
    }
}

mongoose.connect("mongodb://127.0.0.1:27017/data")
    .then(() => getFilteredWorkspots(userId, {districts, features}))
    .then(workspots => console.log(workspots))
    .catch(console.error)
    .finally(mongoose.disconnect)




