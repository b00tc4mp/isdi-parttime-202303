
const retrieveUserGeolocation = async () => {
    try {
        const response = await fetch('https://ipinfo.io?token=7a1a4123a6698c');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const { city } = data;
        return city
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
    }
};
export default retrieveUserGeolocation;
