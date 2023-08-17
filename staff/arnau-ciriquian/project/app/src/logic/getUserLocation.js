import * as Location from 'expo-location';


export default getUserLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // For high accuracy, use Location.Accuracy.High
        timeout: 60000, // Maximum time to wait for the location in milliseconds
      });
  
      //console.log(location.coords.latitude.toFixed(5), location.coords.longitude.toFixed(5));
  
      const currentLatitude = location.coords.latitude.toFixed(5);
      const currentLongitude = location.coords.longitude.toFixed(5);
  
      return { latitude: currentLatitude, longitude: currentLongitude };
  
    } catch (error) {
      //console.warn('Error getting location:', error);
    }
  };