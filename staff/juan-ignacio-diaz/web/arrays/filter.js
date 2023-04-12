export default function filter(array, callback) {
    const filtered = []

    for (const element of array) 
        if(callback(element)) filtered.push(element)
    
    return filtered
}