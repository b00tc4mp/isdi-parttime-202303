require('dotenv').config()
const mongoose = require('mongoose')
const getFilteredWorkspots = require('./getFilteredWorkspots')

const userId = "64f7ca9d75c2fa49950ab36e"

const districts = {
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
}
	
category = {
    coffeeShop: false,
    restaurant: false,
    coWorking: false,
    library: false,
    hotelLobby: false
}

const features = {
    wifi: {
        unlimitedFree: false,
        timeLimited: false,
        timeLimitedWithPurchase: false,
        paidOptions: false,
        unavailable: false,
    },

    plugs: {
        nonse: false,
        few: false,
        plenty: false,
    },

    noise: {
        quite: false,
        moderate: false,
        loud: false,
    },

    otherFeatures: {
        accessibility: false,
        petFriendly: false,
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

mongoose.connect(process.env.MONGODB_URL)
    .then(() => getFilteredWorkspots(userId, {districts, category, features}))
    .then(workspots => console.log(workspots))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())





