export default function every (array, callback) {
    for(const element of array)
        if (!callback(element)) 
            return false
            
    return true
}