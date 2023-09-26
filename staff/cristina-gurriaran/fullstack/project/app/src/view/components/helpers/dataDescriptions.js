export const getWifiDescriptions = (wifiOption) => {
    switch (wifiOption) {
        case "unlimitedFree": return "Enjoy unlimited free WiFi for seamless connectivity without restrictions."
        case "timeLimited": return "Free Wifi Service is available for a limited amount of time"
        case "timeLimitedWithPurchase": return "Make a purchase and gain access to WiFi for a set duration."
        case "paidOptions": return "Choose between various WiFi packages to suit your needs"
        case "unavailable": return "Please note that WiFi service is currently not unavailable at this location."
    }
}

export const getPlugDescriptions = (plugOption) => {
    switch(plugOption) {
        case "none": return "There are no available plugs at this location, make sure to bring your own power source."
        case "few": return "You'll find a limited number of power outlets scattered around to charge your devices"
        case "plenty": return "There are plenty of conveniently placed power outlets for all your devices."
    }
}

export const getNoiseDescriptions = (noiseOption) => {
    switch (noiseOption) {
        case "quiet": return "Enjoy a quiet and peaceful environment, perfect for focusing on your tasks."
        case "moderate": return "The noise level is just right, striking a balance between ambiance and concentration."
        case "loud": return "Be prepared for a lively and loud ambiance at this location."
    }
}
