const { ObjectId } = require('mongodb')

module.exports = () => {
    return {
            author: new ObjectId(),
            image: `image-${Math.random()}`,
            name: `title-${Math.random()}`,
            location: {
                street: `street-${Math.random()}`,
                postalCode: `postalCode-${Math.random()}`,
                city: `city-${Math.random()}`,
                country: `country-${Math.random()}`,
                districts: {
                    ciutatVella: Math.random() < 0.5,
                    gracia: Math.random() < 0.5,
                    horta: Math.random() < 0.5,
                    lEixample: Math.random() < 0.5,
                    lesCorts: Math.random() < 0.5,
                    nouBarris: Math.random() < 0.5,
                    santAndreu: Math.random() < 0.5,
                    santMarti: Math.random() < 0.5,
                    santsMontjuic: Math.random() < 0.5,
                    sarriaSantGervasi: Math.random() < 0.5,
                },
                mapLocation: {
                    location: `Point`,
                    coordinates: [],
                },
            },
            description: `description-${Math.random()}`,
            category: {
                coffeeShop: Math.random() < 0.5,
                restaurant: Math.random() < 0.5,
                coWorking: Math.random() < 0.5,
                library: Math.random() < 0.5,
                hotelLobby: Math.random() < 0.5
            },
            features: {
                wifi: {
                    unlimitedFree: Math.random() < 0.5,
                    timeLimited: Math.random() < 0.5,
                    timeLimitedWithPurchase: Math.random() < 0.5,
                    paidOptions: Math.random() < 0.5,
                    unavailable: Math.random() < 0.5,
                },
                plugs: {
                    none: Math.random() < 0.5,
                    few: Math.random() < 0.5,
                    plenty: Math.random() < 0.5,
                },
                noise: {
                    quiet: Math.random() < 0.5,
                    moderate: Math.random() < 0.5,
                    loud: Math.random() < 0.5,
                },
                otherFeatures: {
                    accessibility: Math.random() < 0.5,
                    petFriendly: Math.random() < 0.5,
                    ensuiteKitchen: Math.random() < 0.5,
                    onSiteRestaurant: Math.random() < 0.5,
                    meetingRooms: Math.random() < 0.5,
                    parking: Math.random() < 0.5,
                    bikeRack: Math.random() < 0.5,
                    storage: Math.random() < 0.5,
                    printScanCopy: Math.random() < 0.5,
                    projector: Math.random() < 0.5,
                    windowView: Math.random() < 0.5,
                }
            },
            likes: [],
            reviews: [],
            date: new Date,
        
    }
}



