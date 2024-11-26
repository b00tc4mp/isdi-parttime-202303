// import env from "react-dotenv"

export default function retrieveUserLocation(callback) {
  let userLocation
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
    
    function success(pos) {
      // const apiKey = import.meta.env.VITE_GEOCODING_API_KEY
      // const apiKey = process.env.VITE_GOOGLE_GEOCODING_API_KEY
      const coordinates = pos.coords
      const longitude = coordinates.longitude
      const latitude = coordinates.latitude
      // userLocation = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      userLocation = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ca`
      console.log(userLocation)
      console.dir(userLocation)
    }
    
    function error(error) {
      console.warn(`ERROR(${error.code}): ${error.message}`)
    }
    
    // navigator.geolocation.getCurrentPosition(success, error, options)
    navigator.geolocation.getCurrentPosition(success, error)
  

  const xhr = new XMLHttpRequest

  xhr.onload = () => {
    const content = JSON.parse(xhr.response)
    const userCity = content.city
    console.log(userCity)

    callback( null, userCity)
  }

  xhr.onerror = () => {
      callback(new Error('Connection error'))
  }
  // xhr.open('GET', userLocation)
  // xhr.send()
  setTimeout(() => {
    xhr.open('GET', userLocation)
    xhr.send()
  }, 1000)

}

