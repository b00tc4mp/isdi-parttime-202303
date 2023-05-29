let userLocation
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}
  function getCurrentLocationSuccess(pos) {
    const coordinates = pos.coords;

    const apiKey = 'AIzaSyB1Pe23z5fgC1w4quW-0WkK0ghyhSPZd-E'
    const longitude = coordinates.longitude
    const latitude = coordinates.latitude

    console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
    
    userLocation = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
}

console.log(userLocation)

setTimeout(() => {
  console.log(userLocation)

}, 5000)
  
  function getCurrentLocationError(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(getCurrentLocationSuccess, getCurrentLocationError, options);





