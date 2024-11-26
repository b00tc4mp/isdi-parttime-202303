export default function some (array, callback) {
    for(let idElement in array)
        if (callback(array[idElement])) 
            return true
            
    return false
}