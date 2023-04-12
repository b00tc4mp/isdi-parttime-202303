function every(array, callback) {
  for (let i = 0; i < array.length; i++) {
      const element = array [i]
      if (callback(element)) {
        return element
      } 
  }
  return false
}

export default every