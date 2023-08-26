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

mongoose.connect("mongodb://127.0.0.1:27017/data")
    .then(() => getFilteredWorkspots({districts, category, features}))
    .then(workspots => console.log(workspots))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())





