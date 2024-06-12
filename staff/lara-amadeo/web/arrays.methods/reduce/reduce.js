export default function reduce(array, callback, initialValue) {
    const hasInitialValue = initialValue !== undefined

    let accum = hasInitialValue ? initialValue : array[0]

    for (let i = hasInitialValue ? 0 : 1; i < array.length; i++)
        accum = callback(accum, array[i])

    return accum
}

