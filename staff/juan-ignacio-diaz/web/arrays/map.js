export default function map(array, callback) {
    const maped = []

    for(const index in array) 
        maped[maped.length] = callback(array[index])

    return maped
}