// import env from "react-dotenv"

export default function retrieveUserLocation(callback) {
  let userLocation

  function success(pos) {
    const coordinates = pos.coords
    const longitude = coordinates.longitude
    const latitude = coordinates.latitude
    userLocation = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ca`
    console.log(userLocation)
  }

  function error(error) {
    console.warn(`ERROR(${error.code}): ${error.message}`)
  }

  navigator.geolocation.getCurrentPosition(success, error)

  const xhr = new XMLHttpRequest

  setTimeout(() => {
    xhr.onload = () => {
      const content = JSON.parse(xhr.response)
      const userCity = content.city
      console.log(userCity)
      callback(null, userCity)
    }
    xhr.onerror = () => {
      callback(new Error('Connection error'))
    }

    xhr.open('GET', userLocation)
    xhr.send()
  }, 2000)


}

