
export default function retrieveUserLocation(callback) {



    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
      
      function success(pos) {
          const apiKey = 'AIzaSyB1Pe23z5fgC1w4quW-0WkK0ghyhSPZd-E'
        const coordinates = pos.coords
        const longitude = coordinates.longitude
        const latitude = coordinates.latitude
        
        return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey} meters.`
      }
      alert(success())
      
      function error(error) {
        console.warn(`ERROR(${error.code}): ${error.message}`)
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options)
    
    

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { content } = JSON.parse(xhr.response)

        callback( null, content)
    }

    xhr.onerror = () => {
        callback(new Error('Connection error'))
    }

    xhr.open(GET, )

}

