export const formatCategory = (category) => {
    switch (category) {
        case "coffeeShop": return "Coffee shop"
        case "restaurant": return "Restaurant"
        case "coWorking": return "Coworking"
        case "library": return "Library"
        case "hotelLobby": return "Hotel loby"
    }
}

export const formatOtherFeatures = (otherFeatures) => {
    switch (otherFeatures) {
        case "accessibility": return "Accessible"
        case "petFriendly": return "Pet Friendly"
        case "ensuiteKitchen": return "Ensuite kitchen"
        case "onSiteRestaurant": return "On site restaurant"
        case "meetingRooms": return "Meeting rooms"
        case "parking": return "Parking"
        case "bikeRack": return "Bike rack"
        case "storage": return "Storage"
        case "printScanCopy": return "Print/Scan/Copy"
        case "projector": return "Projector"
        case "windowView": return "Window view"
    }
}


export const formatDistrict = (district) => {
    switch (district) {
        case "ciutatVella": return "Ciutat Vella"
        case "gracia": return "Gràcia"
        case "horta": return "Horta"
        case "lEixample": return "L'Eixample"
        case "lesCorts": return "Les Corts"
        case "nouBarris": return "Nou Barris"
        case "santAndreu": return "Sant Andreu"
        case "santMarti": return "Sant Marti"
        case "santsMontjuic": return "Sants-Montjuïc"
        case "sarriaSantGervasi": return "Sarrià-Sant Gervasi"
    }
}

export const formatWifi = (wifiOption) => {
    switch (wifiOption) {
        case "unlimitedFree": return "Unlimited free"
        case "timeLimited": return "Time limited"
        case "timeLimitedWithPurchase": return "Time limited with purchase"
        case "paidOptions": return "Paid options"
        case "unavailable": return "Unavailable"
    }
}
export const formatPlugs = (plugOption) => {
    switch (plugOption) {
        case "none": return "None"
        case "few": return "Few"
        case "plenty": return "Plenty"
    }
}

export const formatNoise = (noiseOption) => {
    switch (noiseOption) {
        case "quiet": return "Quiet"
        case "moderate": return "Moderate"
        case "loud": return "Loud"
    }
}

