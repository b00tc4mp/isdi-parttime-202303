function every(array, callback) {
    for(let i = 0; i < array.length; i++) {
        const element = array[i]
        while(callback(element) === false) {
            console.log(false)
            return false
        }
       
    }  
    return true
}

export default every