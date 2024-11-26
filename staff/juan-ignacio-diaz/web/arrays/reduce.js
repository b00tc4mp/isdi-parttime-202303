export default function reduce (array, callback, initial) {
    let accumulator = 0
    
    if (!initial) accumulator = initial

    for (const index  in array)
        accumulator += callback(accumulator, array[index])

    return accumulator
}