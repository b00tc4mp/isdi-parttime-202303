export default function reduce(array, callback, initialValue) {
    const hasInitialValue = initialValue !== undefined

    let accum = hasInitialValue ? initialValue : array[0]

    for (let i = hasInitialValue ? 0 : 1; i < array.length; i++)
        accum = callback(accum, array[i])

    return accum
}


    // let accum = initialValue? initialValue : array[0]

    // for(let i = 0; i < array.length; i++)
    //    accum = callback(accum, array[i])
    // return accum


    // let accum

    // if(!initialValue){
    //     accum = array[0]
    // }
    // else {
    //     accum = initialValue
    // }

    //     for(let i = 1; i < array.length; i++)
    //        accum = callback(accum, array[i])

    //     return accum