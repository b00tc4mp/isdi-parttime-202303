function some(array, callback) {
  for (let i = 0; i < array.length; i++) {
      const element = array [i]
      if (callback(element)) {
        return true
      } 
  }
  return false
}

export default some