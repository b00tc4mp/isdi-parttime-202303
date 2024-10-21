const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (angle) => angle * (Math.PI / 180);
    lat1 = toRad(lat1);
    lon1 = toRad(lon1);
    lat2 = toRad(lat2);
    lon2 = toRad(lon2);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const R = 6371; // Earth's radius in kilometers
    return R * c;
};

const closerCity = (lat, lon) => {
    const madridCoords = [40.4168, -3.7038];
    const barcelonaCoords = [41.3851, 2.1734];

    const distToMadrid = haversineDistance(lat, lon, ...madridCoords);
    const distToBarcelona = haversineDistance(lat, lon, ...barcelonaCoords);

    return distToMadrid < distToBarcelona ? "Madrid" : "Barcelona";
};

const retrieveUserGeolocation = async () => {
    try {
        const response = await fetch('https://ipinfo.io?token=7a1a4123a6698c');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const { city, loc } = data;

        // Parse the 'loc' to get latitude and longitude
        const [lat, lon] = loc.split(',').map(Number);

        // If city is closer to Madrid or Barcelona, overwrite the city value
        if (city !== "Madrid" && city !== "Barcelona") {
            return closerCity(lat, lon);
        }

        return city;
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
    }
};

export default retrieveUserGeolocation;
